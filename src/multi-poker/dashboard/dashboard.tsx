import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { RoomModel, EDIT_ROOMS_TYPES } from '../models/room.models';
import { Firebase } from '../../core/services/firebase/firebase.service';
import { isPresent, findIndexBy } from '../../core/helpers/ramda';
import { Preloader } from '../../core/components/preloader/preloader';
import { setRooms, setRoom, addRoom, removeRoom } from './store/dashboard.actions';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { SCREENS } from '../../core/navigation/screens';
import { EditRoom } from './components/edit-room/edit-room';
import { ListedRoom } from './components/listed-room/listed-room';
import { ListedNewRoom } from './components/listed-new-room/listed-new-room';
import { toggleValue } from '../../core/helpers/toggle-value/toggle-value.helper';
import { prepareNewRoom } from './helpers/prepare-new-room/prepare-new-room.helper';

interface DispatchProps {
  setRooms: (rooms: RoomModel[]) => void;
  setRoom: (room: RoomModel) => void;
  addRoom: (payload: { room: RoomModel, index: number }) => void;
  removeRoom: (room: number) => void;
}

interface StateProps {
  rooms: RoomModel[];
}

interface State {
  isPending: boolean;
  isCreatingRoom: boolean;
  isSwiping: boolean;
}

export class _Dashboard extends React.Component<StateProps & DispatchProps & NavigationProps, State> {
  constructor(props: StateProps & DispatchProps & NavigationProps) {
    super(props);
    this.state = {
      isPending: false,
      isCreatingRoom: false,
      isSwiping: false,
    };

    this.updateRooms = this.updateRooms.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleAddRoom = this.handleAddRoom.bind(this);
    this.handleRemoveRoom = this.handleRemoveRoom.bind(this);
    this.toggleSwiping = this.toggleSwiping.bind(this);
    this.toggleCreateRoom = this.toggleCreateRoom.bind(this);
  }

  componentDidMount() {
    this.setState({ isPending: true }, () => {
      Firebase.listen('/rooms', this.updateRooms);
    });
  }

  updateRooms(rooms: RoomModel[]) {
    this.props.setRooms(rooms);
    this.setState({
      isPending: false,
    });
  }

  handleNavigate(room: RoomModel) {
    this.props.setRoom(room);
    this.props.navigation.navigate(SCREENS.ROOM);
  }

  toggleCreateRoom(value?: boolean) {
    this.setState(toggleValue('isCreatingRoom', value))
  }

  toggleSwiping(value?: boolean) {
    this.setState(toggleValue('isSwiping', value));
  }

  handleAddRoom(room: RoomModel) {
    this.toggleCreateRoom(false);
    this.props.addRoom(
      prepareNewRoom(room, this.props.rooms)
    );
  }

  handleRemoveRoom(room: RoomModel) {
    const index = findIndexBy('id', room.id)(this.props.rooms);
    this.props.removeRoom(index);
  }

  render() {
    const { rooms } = this.props;
    const { isPending, isCreatingRoom, isSwiping } = this.state;

    return (
      <AppContainer>
        <ScrollContainer>
          {isPresent(rooms) && rooms.map((room: RoomModel) => room && (
            <ListedRoom
                key={room.id}
                room={room}
                isSwiping={isSwiping}
                handleRemoveRoom={this.handleRemoveRoom}
                handleNavigate={this.handleNavigate}
                toggleSwiping={this.toggleSwiping}
            />
          ))}

          <ListedNewRoom toggleCreateRoom={this.toggleCreateRoom} />
        </ScrollContainer>

        {isCreatingRoom && (
          <EditRoom
              type={EDIT_ROOMS_TYPES.CREATE}
              room={rooms[0]}
              handleSubmit={this.handleAddRoom}
              handleDismiss={() => this.toggleCreateRoom(false)}
          />
        )}

        {isPending && <Preloader />}
      </AppContainer>
    );
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  rooms: R.path([ 'rooms', 'models' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setRooms, setRoom, addRoom, removeRoom },
  dispatch,
);

export const Dashboard = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Dashboard);
