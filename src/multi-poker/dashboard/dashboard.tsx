import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, ScrollContainer } from '@core/styled';
import { Firebase } from '@core/services/firebase/firebase.service';
import { isPresent } from '@core/helpers';
import { Preloader } from '@core/components';
import { NavigationProps } from '@core/navigation/navigation.model';
import { RoomModel, EDIT_ROOMS_TYPES } from '../models/room.models';
import { setRooms, setRoom, addRoom, removeRoom } from './store/dashboard.actions';
import { EditRoom } from './components/edit-room/edit-room';
import { ListedRoom } from './components/listed-room/listed-room';
import { ListedNewRoom } from './components/listed-new-room/listed-new-room';
import { prepareNewRoom } from './helpers/prepare-new-room/prepare-new-room.helper';
import { joinRoom } from './helpers/join-room/join-room.helper';

interface DispatchProps {
  setRooms: (rooms: RoomModel[]) => void;
  setRoom: (room: RoomModel) => void;
  addRoom: (payload: RoomModel) => void;
  removeRoom: (id: string) => void;
}

interface StateProps {
  rooms: {[key: string]: RoomModel};
  jiraAccountId: string;
}

export const _Dashboard = (props: StateProps & DispatchProps & NavigationProps) => {
  const [ isPending, setPending ] = React.useState(false);
  const [ isCreatingRoom, setCreateRoom ] = React.useState(false);
  const [ isSwiping, setSwiping ] = React.useState(false);

  React.useEffect(() => {
    setPending(true);
    Firebase.subscribe('/rooms', updateRooms);

    return () => {
      Firebase.unsubscribe('/rooms');
    };
  }, []);

  const updateRooms = (rooms: RoomModel[]) => {
    props.setRooms(rooms);
    setPending(false);
  };

  const handleNavigate = (room: RoomModel) => {
    joinRoom(props.setRoom, props.navigation.navigate, room);
  }

  const handleAddRoom = (room: RoomModel) => {
    const newRoom = prepareNewRoom(room);
    setCreateRoom(false);
    props.addRoom(newRoom);
    handleNavigate(newRoom);
  };

  const handleRemoveRoom = (room: RoomModel) => {
    props.removeRoom(room.id);
  };

  const isConnectedWithJira = props.jiraAccountId;

  return (
    <AppContainer>
      <ScrollContainer>
        {isPresent(props.rooms) && R.values(props.rooms).map((room: RoomModel) => room && (
          <ListedRoom
              key={room.id}
              room={room}
              isSwiping={isSwiping}
              handleRemoveRoom={handleRemoveRoom}
              handleNavigate={handleNavigate}
              setSwiping={setSwiping}
          />
        ))}

        {isConnectedWithJira && <ListedNewRoom setCreateRoom={setCreateRoom} />}
      </ScrollContainer>

      {isCreatingRoom && (
        <EditRoom
            type={EDIT_ROOMS_TYPES.CREATE}
            handleSubmit={handleAddRoom}
            handleDismiss={() => setCreateRoom(false)}
        />
      )}

      {isPending && <Preloader />}
    </AppContainer>
  );
}

const mapStateToProps = R.applySpec<StateProps>({
  rooms: R.path([ 'rooms', 'models' ]),
  jiraAccountId: R.path([ 'jira', 'user', 'accountId' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setRooms, setRoom, addRoom, removeRoom },
  dispatch,
);

export const Dashboard = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Dashboard);
