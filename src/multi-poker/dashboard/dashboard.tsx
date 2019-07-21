import * as React from 'react';
import * as R from 'ramda';
import { ListItem, Divider, colors } from 'react-native-elements';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable-row';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { RoomModel, EDIT_ROOMS_TYPES } from '../models/room.models';
import { Firebase } from '../../core/services/firebase/firebase.service';
import { isPresent, rejectNil } from '../../core/helpers/ramda';
import { Preloader } from '../../core/components/preloader/preloader';
import { setRooms, setRoom, addRoom, removeRoom } from './store/dashboard.actions';
import { Dispatch, bindActionCreators } from 'redux';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { SCREENS } from '../../core/navigation/screens';
import { EditRoom } from './components/edit-room/edit-room';
import { SwipeDeleteBar } from './components/swipe-delete-bard/swipe-delete-bar';

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
    this.setState(state => ({
      isCreatingRoom: R.isNil(value) ? !state.isCreatingRoom : value
    }));
  }

  getNewRoomId() {
    const ids = R.pipe<RoomModel[], any[], any[], number[]>(
      R.map(R.prop('id')),
      R.reject(R.isNil),
      R.map(Number),
    )(this.props.rooms);

    return R.inc(Math.max(...ids));
  }

  handleAddRoom(room: RoomModel) {
    this.toggleCreateRoom(false);
    this.props.addRoom({
      room: {
        id: this.getNewRoomId(),
        ...room,
      },
      index: this.props.rooms.length,
    });
  }

  handleRemoveRoom(room: RoomModel) {
    const index = R.findIndex(v => R.propOr('', 'id', v) === room.id)(this.props.rooms);
    this.props.removeRoom(index);
  }

  render() {
    const { rooms } = this.props;
    const { isPending, isCreatingRoom, isSwiping } = this.state;
    const swipeHeight = isSwiping ? 76.5 : 0;

    return (
      <AppContainer>
        <ScrollContainer>
          {isPresent(rooms) && rooms.map((room: RoomModel) => room && (
            <React.Fragment key={room.id}>
              <Swipeable
                  onSwipeStart={() => this.setState({ isSwiping: true })}
                  leftContent={<SwipeDeleteBar height={swipeHeight} />}
                  leftActionActivationDistance={200}
                  onLeftActionRelease={() => this.handleRemoveRoom(room)}
              >
                <TouchableOpacity onPress={() => this.handleNavigate(room)}>
                  <ListItem
                      title={room.name}
                      subtitle={R.propOr(room.name, 'description', room)}
                      rightIcon={{ name: 'arrow-forward' }}
                  />
                </TouchableOpacity>
              </Swipeable>
              <Divider />
            </React.Fragment>
          ))}

          <TouchableOpacity onPress={() => this.toggleCreateRoom(true)}>
            <ListItem
                title="Add Room"
                subtitle="Add new Room"
                rightIcon={{ name: 'add' }}
            />
          </TouchableOpacity>
          <Divider />
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
