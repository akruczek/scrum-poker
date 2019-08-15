import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, ScrollContainer } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { Firebase } from '@core/services/firebase/firebase.service';
import { isPresent } from '@core/helpers';
import { NavigationProps } from '@core/navigation/navigation.model';
import { SCREENS } from '@core/navigation/screens';
import { HeaderBackButton, HeaderRightIcon } from '@core/components';
import { PokerCard, TRANSLATIONS } from '@core/models';
import { RoomModel, EDIT_ROOMS_TYPES } from '../models/room.models';
import { SelectCard } from '../dashboard/components/select-card/select-card';
import { UserModel } from '../../auth/models/auth.models';
import { ListedUser } from './components/listed-user/listed-user';
import { RoomButtonsSet } from './components/room-buttons-set/room-buttons-set';
import { JiraPusher } from './components/jira-pusher/jira-pusher';
import { EditRoom } from '../dashboard/components/edit-room/edit-room';
import {
  getEstimation, getResetPayload, getNewEstimation, hasAdmin, addDefaultUser, updateRoomProperties,
} from './helpers';
import {
  addUser, showDown, reset, setRoom, setValue, SetValuePayload, AddUserPayload, updateRoom,
} from '../dashboard/store/dashboard.actions';

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
  setValue: (payload: SetValuePayload) => void;
  updateRoom: (room: RoomModel) => void;
}

export const _Room = ({
  room, user, jiraAccountId, navigation,
  addUser, showDown, reset, setRoom, setValue, updateRoom,
}: StateProps & NavigationProps & DispatchProps) => {
  const [ users, setUsers ] = React.useState<UserModel[]>([]);
  const [ isSelecting, setSelecting ] = React.useState(false);
  const [ isJiraPusherVisible, setJiraPusherVisibility ] = React.useState(false);
  const [ isEditingRoom, setEditingRoom ] = React.useState(false);

  React.useEffect(() => {
    Firebase.listen(`/rooms/${room.id}`, getUsers);
    addDefaultUser(user, room)(addUser);

    navigation.setParams({
      handleEditRoom: () => setEditingRoom(true),
      isAdmin: jiraAccountId && (R.isEmpty(users) || hasAdmin(user.email, room.users, jiraAccountId)),
    });

    return () => {
      Firebase.unsubscribe(`/rooms/${room.id}`);
    };
  }, []);

  const getUsers = (room: RoomModel) => {
    setUsers(R.values<RoomModel, any>(R.propOr([], 'users', room)));
    setRoom(room);
  };

  const handleReset = () => {
    reset(getResetPayload(room));
  };

  const handleOnListItemPress = (email: string) => {
    if (R.propEq('email', email, user)) {
      setSelecting(true);
    }
  };

  const handleSelectCard = (card: PokerCard) => {
    setSelecting(false);
    setValue(getNewEstimation(card, room.id, user.email));
  };

  const handleUpdateRoom = (newRoom: RoomModel) => {
    updateRoomProperties(newRoom, room)(updateRoom, setEditingRoom);
  };

  return (
    <AppContainer fullHorizontal>
      <ScrollContainer>
        {isPresent(users) && (users || []).map((_user: UserModel) => (
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

      {isSelecting && <SelectCard handleSelect={handleSelectCard} cards={room.poker.cards} />}

      {isJiraPusherVisible && (
        <JiraPusher handleClose={() => setJiraPusherVisibility(false)} handleReset={handleReset} />
      )}

      {isEditingRoom && (
        <EditRoom
            type={EDIT_ROOMS_TYPES.UPDATE}
            handleSubmit={handleUpdateRoom}
            handleDismiss={() => setEditingRoom(false)}
            room={room}
        />
      )}
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
  { addUser, showDown, reset, setRoom, setValue, updateRoom },
  dispatch,
);

export const Room = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Room);
