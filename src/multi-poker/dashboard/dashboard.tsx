import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, ScrollContainer } from '@core/styled';
import { Preloader } from '@core/components';
import { JiraConfigurationModel, RoomModel, EDIT_ROOMS_TYPES, NavigationProps } from '@core/models';
import { setRooms, setRoom, addRoom, removeRoom } from './store/dashboard.actions';
import { EditRoom } from './components/edit-room/edit-room';
import { ListedRoom } from './components/listed-room/listed-room';
import { ListedNewRoom } from './components/listed-new-room/listed-new-room';
import { useSubscribeRooms } from './hooks/subscribe-rooms/subscribe-rooms.hook';
import { getRoomsList } from './helpers/get-rooms-list/get-rooms-list.helper';
import { useCreateRoom } from './hooks/create-room/create-room.hook';
import { useRemoveRoom } from './hooks/remove-room/remove-room.hook';

interface DispatchProps {
  setRooms: (rooms: RoomModel[]) => void;
  setRoom: (room: RoomModel) => void;
  addRoom: (payload: RoomModel) => void;
  removeRoom: (id: string) => void;
}

interface StateProps {
  rooms: {[key: string]: RoomModel};
  jiraAccountId: string;
  jiraConfiguration: JiraConfigurationModel;
}

export const _Dashboard = ({
  setRooms, setRoom, addRoom, removeRoom, rooms,
  jiraAccountId, navigation, jiraConfiguration,
}: StateProps & DispatchProps & NavigationProps) => {
  const [ isPending ] = useSubscribeRooms(setRooms);
  const [ isSwiping, setSwiping, handleRemoveRoom ] = useRemoveRoom(removeRoom);
  const [ isCreatingRoom, setCreateRoom, handleNavigate, handleAddRoom ] =
    useCreateRoom(addRoom, setRoom, navigation.navigate)

  return (
    <AppContainer>
      <ScrollContainer>
        {getRoomsList(rooms).map((room: RoomModel) => (
          <ListedRoom key={room.id} {...{ room, isSwiping, handleRemoveRoom, handleNavigate, setSwiping }} />
        ))}

        {jiraAccountId && <ListedNewRoom setCreateRoom={setCreateRoom} />}
      </ScrollContainer>

      {isCreatingRoom && (
        <EditRoom
            type={EDIT_ROOMS_TYPES.CREATE}
            handleSubmit={handleAddRoom}
            handleDismiss={() => setCreateRoom(false)}
            jiraConfiguration={jiraConfiguration}
        />
      )}

      {isPending && <Preloader />}
    </AppContainer>
  );
}

const mapStateToProps = R.applySpec<StateProps>({
  rooms: R.path([ 'rooms', 'models' ]),
  jiraAccountId: R.path([ 'jira', 'user', 'accountId' ]),
  jiraConfiguration: R.path([ 'jira', 'configuration' ])
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setRooms, setRoom, addRoom, removeRoom },
  dispatch,
);

export const Dashboard = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Dashboard);
