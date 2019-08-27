import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, ScrollContainer } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { NavigationProps } from '@core/navigation/navigation.model';
import { SCREENS } from '@core/navigation/screens';
import { HeaderBackButton, HeaderRightIcon } from '@core/components';
import { TRANSLATIONS, RoomModel, UserModel } from '@core/models';
import { ListedUser } from './components/listed-user/listed-user';
import { RoomButtonsSet } from './components/room-buttons-set/room-buttons-set';
import { getEstimation, getResetPayload, hasAdmin } from './helpers';
import { addUser, showDown, reset, setRoom, AddUserPayload } from '../dashboard/store/dashboard.actions';
import { RoomModals } from './components/room-modals/room-modals';
import { useSubscribeRoom } from './hooks/subscribe-room/subscribe-room.hook';

interface StateProps {
  room: RoomModel;
  user: UserModel;
  jiraAccountId: string;
}

interface DispatchProps {
  addUser: (user: AddUserPayload) => void;
  showDown: (room: RoomModel) => void;
  reset: (room: RoomModel) => void;
  setRoom: (room: RoomModel) => void;
}

export const _Room = ({
  room, user, jiraAccountId, navigation, addUser, showDown, reset, setRoom,
}: StateProps & NavigationProps & DispatchProps) => {
  const [ isSelecting, setSelecting ] = React.useState(false);
  const [ isJiraPusherVisible, setJiraPusherVisibility ] = React.useState(false);
  const [ isEditingRoom, setEditingRoom ] = React.useState(false);
  const users = useSubscribeRoom(room, user, jiraAccountId, navigation)(addUser, setRoom, setEditingRoom);

  const handleReset = () => {
    reset(getResetPayload(room));
  };

  const handleOnListItemPress = (email: string) => {
    if (R.propEq('email', email, user)) {
      setSelecting(true);
    }
  };

  const getRoomModalsProps = () => ({
    isSelecting, room, user, isJiraPusherVisible, isEditingRoom,
    setSelecting, setJiraPusherVisibility, setEditingRoom, handleReset
  });

  return (
    <AppContainer fullHorizontal>
      <ScrollContainer>
        {users.map((_user: UserModel) => (
          <ListedUser
              key={_user.email}
              onListItemPress={handleOnListItemPress}
              room={room}
              user={_user}
              email={user.email}
              estimations={getEstimation(room)}
          />
        ))}
      </ScrollContainer>

      {hasAdmin(user.email, room.users, jiraAccountId) && (
        <RoomButtonsSet
            handleReset={handleReset}
            handleShowDown={() => showDown(room)}
            handlePushToJira={() => setJiraPusherVisibility(true)}
            isDiscovered={room.discovered}
        />
      )}

      <RoomModals {...getRoomModalsProps()} />
    </AppContainer>
  );
};

_Room.navigationOptions = (props: NavigationProps & StateProps) => ({
  title: translate(TRANSLATIONS.ROOM),
  headerLeft: <HeaderBackButton navigation={props.navigation} screen={SCREENS.MULTI_PLAYER} />,
  headerRight: props.navigation.getParam('isAdmin') && (
    <HeaderRightIcon icon="edit" onPress={props.navigation.getParam('handleEditRoom')} />
  ),
});

const mapStateToProps = R.applySpec<StateProps>({
  room: R.path([ 'rooms', 'model' ]),
  user: R.path([ 'auth', 'model' ]),
  jiraAccountId: R.path([ 'jira', 'user', 'accountId' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { addUser, showDown, reset, setRoom },
  dispatch,
);

export const Room = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Room);
