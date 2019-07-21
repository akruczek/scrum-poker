import * as React from 'react';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import { ListItem, Divider, Icon } from 'react-native-elements';
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
import { addUser, AddUserPayload } from '../dashboard/store/dashboard.actions';

interface State {
  users: UserModel[];
}

interface StateProps {
  room: RoomModel;
  rooms: RoomModel[];
  user: UserModel;
}

interface DispatchProps {
  addUser: (user: AddUserPayload) => void;
}

export class _Room extends React.Component<StateProps & NavigationProps & DispatchProps, State> {
  constructor(props: StateProps & NavigationProps & DispatchProps) {
    super(props);
    this.state = {
      users: [],
    };

    this.getUsers = this.getUsers.bind(this);
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
    Firebase.listen(`/rooms/${this.props.room.id}/users`, this.getUsers);

    if (!this.props.room.users.map(u => u.email).includes(this.props.user.email)) {
      this.props.addUser({
        user: this.props.user,
        index: this.props.room.users.length,
        roomIndex: R.findIndex(R.propEq('id', this.props.room.id))(this.props.rooms),
      });
    }
  }

  getUsers(users: UserModel[]) {
    this.setState({ users });
  }

  render() {
    const { users } = this.state;

    return (
      <AppContainer>
        <ScrollContainer>
          {isPresent(users) && users.map((user: UserModel) => (
            <React.Fragment key={user.email}>
              <TouchableOpacity onPress={() => null}>
                <ListItem
                    title={parseName(user.email)}
                    subtitle={user.email}
                    rightIcon={{ name: 'check' }}
                />
              </TouchableOpacity>
              <Divider />
            </React.Fragment>
          ))}
        </ScrollContainer>
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
  { addUser },
  dispatch,
);

export const Room = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Room);
