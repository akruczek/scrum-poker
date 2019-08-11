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
  addUser, showDown, reset, setRoom, setValue, SetValuePayload, AddUserPayload, updateRoom,
} from '../dashboard/store/dashboard.actions';
import {
  getEstimation, isAdmin, getResetPayload, getNewEstimation, getNewUser,
} from './helpers';

interface StateProps {
  room: RoomModel;
  rooms: RoomModel[];
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

export const _Room = (props: StateProps & NavigationProps & DispatchProps) => {
  const [ users, setUsers ] = React.useState<UserModel[]>([]);
  const [ isSelecting, setSelecting ] = React.useState(false);
  const [ isJiraPusherVisible, setJiraPusherVisibility ] = React.useState(false);
  const [ isEditingRoom, setEditingRoom ] = React.useState(false);

  React.useEffect(() => {
    Firebase.listen(`/rooms/${props.room.id}`, getUsers);

    const isUserIn = R.any(
      R.propEq('email', props.user.email)
    )(R.values(R.pathOr([], [ 'room', 'users' ], props)));

    if (!isUserIn) {
      props.addUser(getNewUser(props.user, props.room));
    }

    props.navigation.setParams({
      handleEditRoom: () => setEditingRoom(true),
      isAdmin: props.jiraAccountId && (R.isEmpty(users) || hasAdmin),
    });

    return () => {
      Firebase.unsubscribe(`/rooms/${props.room.id}`);
    };
  }, []);

  const hasAdmin = isAdmin(props.user.email)(R.values(R.pathOr([], [ 'room', 'users' ], props))) && props.jiraAccountId;

  const getUsers = (room: RoomModel) => {
    setUsers(R.values<RoomModel, any>(R.propOr([], 'users', room)));
    props.setRoom(room);
  };

  const handleReset = () => {
    props.reset(getResetPayload(props.room));
  };

  const handleOnListItemPress = (user: UserModel) => {
    if (user.email === props.user.email) {
      setSelecting(true);
    }
  };

  const handleSelectCard = (card: PokerCard) => {
    setSelecting(false);
    props.setValue(getNewEstimation(card, props.room.id, props.user.email));
  };

  const handleUpdateRoom = (room: RoomModel) => {
    const newUsers: UserModel[] = R.when(
      () => room.poker !== props.room.poker,
      R.map(R.dissoc('selectedValue')),
    )(props.room.users);

    props.updateRoom({
      ...props.room,
      ...room,
      users: newUsers,
    });
    setEditingRoom(false);
  };

  const estimation = (): (number|string)[] | null => {
    const { discovered, users } = props.room;
    return discovered ? getEstimation(users) : null;
  };

  return (
    <AppContainer fullHorizontal>
      <ScrollContainer>
        {isPresent(users) && (users || []).map((user: UserModel) => (
          <ListedUser
              key={user.email}
              onListItemPress={handleOnListItemPress}
              room={props.room}
              user={user}
              email={props.user.email}
              estimations={estimation()}
          />
        ))}
      </ScrollContainer>

      {hasAdmin && (
        <RoomButtonsSet
            handleReset={handleReset}
            handleShowDown={() => props.showDown(props.room)}
            handlePushToJira={() => setJiraPusherVisibility(true)}
            isDiscovered={props.room.discovered}
        />
      )}

      {isSelecting && <SelectCard handleSelect={handleSelectCard} cards={props.room.poker.cards} />}

      {isJiraPusherVisible && (
        <JiraPusher handleClose={() => setJiraPusherVisibility(false)} handleReset={handleReset} />
      )}

      {isEditingRoom && (
        <EditRoom
            type={EDIT_ROOMS_TYPES.UPDATE}
            handleSubmit={handleUpdateRoom}
            handleDismiss={() => setEditingRoom(false)}
            room={props.room}
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
  rooms: R.path([ 'rooms', 'models' ]),
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
