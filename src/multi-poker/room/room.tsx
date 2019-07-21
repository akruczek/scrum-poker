import * as React from 'react';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import { ListItem, Divider, Icon, Button, colors } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { UserModel } from '../../core/models/auth.models';
import { Firebase } from '../../core/services/firebase/firebase.service';
import { isPresent, parseName } from '../../core/helpers';
import { RoomModel } from '../models/room.models';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { SCREENS } from '../../core/navigation/screens';
import { Text } from '../../core/styled/text/text.styled';
import { SelectCard } from '../dashboard/components/select-card/select-card';
import { PokerCard } from '../../single-poker/models/poker-card.models';
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
  }

  static navigationOptions = (props: NavigationProps & StateProps) => ({
    title: 'Room',
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.navigate(SCREENS.MULTI_PLAYER)}>
        <Icon name="arrow-back" />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    Firebase.listen(`/rooms/${this.props.room.id}`, this.getUsers);

    if (!(this.props.room.users || []).map(u => u.email).includes(this.props.user.email)) {
      this.props.addUser({
        user: this.props.user,
        index: (this.props.room.users || []).length,
        roomIndex: R.findIndex(R.propEq('id', this.props.room.id))(this.props.rooms),
      });
    }
  }

  getUsers(room: RoomModel) {
    this.setState({ users: room.users });
    this.props.setRoom(room);
  }

  getIcon(user: UserModel) {
    return R.cond([
      [ R.isNil, R.always('live-help') ],
      [ value => isPresent(value) && !(this.props.room || {}).discovered, R.always('check') ],
      [ value => isPresent(value) && !!(this.props.room || {}).discovered, R.always('format-list') ],
      [ R.T, R.always('live-help') ]
    ])(user.selectedValue);
  }

  handleShowDown() {
    this.props.showDown({
      room: this.props.room,
      index: R.findIndex(R.propEq('id', this.props.room.id))(this.props.rooms),
    });
  }

  handleReset() {
    this.props.reset({
      room: {
        ...this.props.room,
        discovered: false,
        users: this.props.room.users.map(u => ({ ...u, selectedValue: null })),
      },
      index: R.findIndex(R.propEq('id', this.props.room.id))(this.props.rooms),
    });
  }

  handleOnListItemPress(user: UserModel) {
    if (user.email === this.props.user.email) {
      this.setState({ isSelecting: true });
    }
  }

  handleSelectCard(card: PokerCard) {
    console.log('select card -> ', card);
    this.setState({ isSelecting: false });
    this.props.setValue({
      value: card,
      roomIndex: R.findIndex(R.propEq('id', this.props.room.id))(this.props.rooms),
      userIndex: R.findIndex(R.propEq('email', this.props.user.email))(this.props.room.users),
    });

  }

  render() {
    const { users } = this.state;
    const isValuePresent = (user: UserModel) => !!(this.props.room || {}).discovered && isPresent(user.selectedValue);

    return (
      <AppContainer>
        <ScrollContainer>
          {isPresent(users) && (users || []).map((user: UserModel) => (
            <React.Fragment key={user.email}>
              <TouchableOpacity onPress={() => this.handleOnListItemPress(user)}>
                <ListItem
                    title={parseName(user.email)}
                    subtitle={user.email}
                    rightIcon={isValuePresent(user) ? undefined : { name: this.getIcon(user) }}
                    rightElement={isValuePresent(user) || (user.email === this.props.user.email && isPresent(user.selectedValue))
                        ? <Text>{R.pathOr('?', [ 'selectedValue', 'label' ], user)}</Text>
                        : undefined}
                />
              </TouchableOpacity>
              <Divider />
            </React.Fragment>
          ))}
        </ScrollContainer>

        <Button
            title="SHOW DOWN"
            onPress={() => this.handleShowDown()}
        />

        <Divider style={{ marginTop: 10, marginBottom: 10 }} />

        <Button
            title="RESET"
            buttonStyle={{ backgroundColor: colors.secondary }}
            onPress={() => this.handleReset()}
        />

        {this.state.isSelecting && <SelectCard handleSelect={this.handleSelectCard} />}
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
