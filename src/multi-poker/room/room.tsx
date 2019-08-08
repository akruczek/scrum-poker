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
import { JiraPusher } from './components/jira-pusher/jira-pusher';
import {
  addUser, showDown, reset, setRoom, setValue, SetValuePayload, AddUserPayload,
} from '../dashboard/store/dashboard.actions';
import {
  getEstimation, isAdmin, getResetPayload, getNewEstimation, getNewUser,
} from './helpers';

interface StateProps {
  room: RoomModel;
  rooms: RoomModel[];
  user: UserModel;
}

interface DispatchProps {
  addUser: (user: AddUserPayload) => void;
  showDown: (room: RoomModel) => void;
  reset: (room: RoomModel) => void;
  setRoom: (room: RoomModel) => void;
  setValue: (payload: SetValuePayload) => void;
}

export const _Room = (props: StateProps & NavigationProps & DispatchProps) => {
  const [ users, setUsers ] = React.useState<UserModel[]>([]);
  const [ isSelecting, setSelecting ] = React.useState(false);
  const [ isJiraPusherVisible, setJiraPusherVisibility ] = React.useState(false);

  React.useEffect(() => {
    Firebase.listen(`/rooms/${props.room.id}`, getUsers);
    const isUserIn = R.any(
      R.propEq('email', props.user.email)
    )(R.values(R.pathOr([], [ 'room', 'users' ], props)));

    if (!isUserIn) {
      props.addUser(getNewUser(props.user, props.room));
    }

    return () => {
      Firebase.unsubscribe(`/rooms/${props.room.id}`);
    };
  }, []);

  const getUsers = (room: RoomModel) => {
    setUsers(R.values<RoomModel, any>(R.propOr([], 'users', room)));
    props.setRoom(room);
  }

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

      {isAdmin(props.user.email)(R.values(R.pathOr([], [ 'room', 'users' ], props))) && (
        <RoomButtonsSet
            handleReset={handleReset}
            handleShowDown={() => props.showDown(props.room)}
            handlePushToJira={() => setJiraPusherVisibility(true)}
            isDiscovered={props.room.discovered}
        />
      )}

      {isSelecting && <SelectCard handleSelect={handleSelectCard} />}
      {isJiraPusherVisible && (
        <JiraPusher handleClose={() => setJiraPusherVisibility(false)} handleReset={handleReset} />
      )}
    </AppContainer>
  );
};

_Room.navigationOptions = (props: NavigationProps & StateProps) => ({
  title: translate(TRANSLATIONS.ROOM),
  headerLeft: <HeaderBackButton navigation={props.navigation} screen={SCREENS.MULTI_PLAYER} />
});

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
