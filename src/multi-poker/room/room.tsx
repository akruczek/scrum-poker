import * as React from 'react';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { UserModel } from '../../core/models/auth.models';
import { Firebase } from '../../core/services/firebase/firebase.service';
import { isPresent, parseName } from '../../core/helpers';
import { RoomModel } from '../models/room.models';
import { NavigationProps } from '../../core/navigation/navigation.model';

interface State {
  users: UserModel[];
}

interface StateProps {
  room: RoomModel;
}

export class _Room extends React.Component<StateProps & NavigationProps, State> {
  constructor(props: StateProps & NavigationProps) {
    super(props);
    this.state = {
      users: [],
    };

    this.getUsers = this.getUsers.bind(this);
  }

  static navigationOptions = {
    title: 'Room',
  };

  componentDidMount() {
    Firebase.listen('/users', this.getUsers);
  }

  getUsers(users: UserModel[]) {
    this.setState({ users });
  }

  render() {
    const { users } = this.state;
    const { room } = this.props;

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
});

export const Room = connect<StateProps, any, any>(
  mapStateToProps, null,
)(_Room);
