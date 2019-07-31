import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, ScrollContainer } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { Firebase } from '@core/services/firebase/firebase.service';
import { isPresent } from '@core/helpers';
import { NavigationProps } from '@core/navigation/navigation.model';
import { SCREENS } from '@core/navigation/screens';
import { HeaderBackButton } from '@core/components';
import { PokerCard, TRANSLATIONS } from '@core/models';
import { RoomModel } from '../models/room.models';
import { SelectCard } from '../dashboard/components/select-card/select-card';
import { UserModel } from '../../auth/models/auth.models';
import { ListedUser } from './components/listed-user/listed-user';
import { RoomButtonsSet } from './components/room-buttons-set/room-buttons-set';
import { getEstimation } from './helpers/get-estimation/get-estimation.helper';
import {
  addUser, AddUserPayload, showDown, reset, RoomPayload, setRoom, setValue, SetValuePayload,
} from '../dashboard/store/dashboard.actions';

interface State {
  users: UserModel[];
  isSelecting: boolean;
}

interface StateProps {
  room: RoomModel;
  rooms: RoomModel[];
  user: UserModel;
}

interface DispatchProps {
  addUser: (user: AddUserPayload) => void;
  showDown: (payload: RoomPayload) => void;
  reset: (payload: RoomPayload) => void;
  setRoom: (room: RoomModel) => void;
  setValue: (payload: SetValuePayload) => void;
}

export class _Room extends React.Component<StateProps & NavigationProps & DispatchProps, State> {
  constructor(props: StateProps & NavigationProps & DispatchProps) {
    super(props);
    this.state = {
      users: [],
      isSelecting: false,
    };

    this.getUsers = this.getUsers.bind(this);
    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.handleOnListItemPress = this.handleOnListItemPress.bind(this);
    this.handleShowDown = this.handleShowDown.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  static navigationOptions = (props: NavigationProps & StateProps) => ({
    title: translate(TRANSLATIONS.ROOM),
    headerLeft: <HeaderBackButton navigation={props.navigation} screen={SCREENS.MULTI_PLAYER} />
  });

  componentDidMount() {
    Firebase.listen(`/rooms/${this.props.room.id}`, this.getUsers);

    if (!(this.props.room.users || []).map(u => u.email).includes(this.props.user.email)) {
      this.props.addUser({
        user: this.props.user,
        index: (this.props.room.users || []).length,
        roomIndex: this.getRoomIndex(),
      });
    }
  }

  getRoomIndex() {
    return R.findIndex(
      r => R.propOr('', 'id', r) === this.props.room.id,
    )(this.props.rooms);
  }

  getUsers(room: RoomModel) {
    this.setState({ users: room.users });
    this.props.setRoom(room);
  }

  handleShowDown() {
    this.props.showDown({
      room: this.props.room,
      index: this.getRoomIndex(),
    });
  }

  handleReset() {
    this.props.reset({
      room: {
        ...this.props.room,
        discovered: false,
        users: this.props.room.users.map(u => ({ ...u, selectedValue: null })),
      },
      index: this.getRoomIndex(),
    });
  }

  handleOnListItemPress(user: UserModel) {
    if (user.email === this.props.user.email) {
      this.setState({ isSelecting: true });
    }
  }

  handleSelectCard(card: PokerCard) {
    this.setState({ isSelecting: false });
    this.props.setValue({
      value: card,
      roomIndex: this.getRoomIndex(),
      userIndex: R.findIndex(R.propEq('email', this.props.user.email))(this.props.room.users),
    });
  }

  getEstimation(): (number|string)[] | null {
    const { discovered, users } = this.props.room;
    return discovered ? getEstimation(users) : null;
  }

  render() {
    const { users, isSelecting } = this.state;
    const { room } = this.props;

    return (
      <AppContainer fullHorizontal>
        <ScrollContainer>
          {isPresent(users) && (users || []).map((user: UserModel) => (
            <ListedUser
                key={user.email}
                onListItemPress={this.handleOnListItemPress}
                room={room}
                user={user}
                email={this.props.user.email}
                estimations={this.getEstimation()}
            />
          ))}
        </ScrollContainer>

        <RoomButtonsSet handleReset={this.handleReset} handleShowDown={this.handleShowDown} />

        {isSelecting && <SelectCard handleSelect={this.handleSelectCard} />}
      </AppContainer>
    );
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  room: R.path([ 'rooms', 'model' ]),
  rooms: R.path([ 'rooms', 'models' ]),
  user: R.path([ 'auth', 'model' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { addUser, showDown, reset, setRoom, setValue },
  dispatch,
);

export const Room = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Room);
