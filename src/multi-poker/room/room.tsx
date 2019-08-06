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
import {
  addUser, AddUserPayload, showDown, reset, RoomPayload, setRoom, setValue, SetValuePayload,
} from '../dashboard/store/dashboard.actions';
import {
  getEstimation, isAdmin, getRoomIndex, getResetPayload, getNewEstimation, getNewUser,
} from './helpers';

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

export const _Room = (props: StateProps & NavigationProps & DispatchProps) => {
  const [ users, setUsers ] = React.useState<UserModel[]>([]);
  const [ isSelecting, setSelecting ] = React.useState(false);

  React.useEffect(() => {
    Firebase.listen(`/rooms/${props.room.id}`, getUsers);
    const isUserIn = R.any(R.propEq('email', props.user.email))(props.room.users)

    if (!isUserIn) {
      props.addUser(getNewUser(props.user, props.room, props.rooms));
    }
  }, []);

  const getUsers = (room: RoomModel) => {
    setUsers(room.users);
    props.setRoom(room);
  }

  const handleShowDown = () => {
    props.showDown({
      room: props.room,
      index: getRoomIndex(props.room.id)(props.rooms),
    });
  }

  const handleReset = () => {
    props.reset(getResetPayload(props.room, props.rooms));
  }

  const handleOnListItemPress = (user: UserModel) => {
    if (user.email === props.user.email) {
      setSelecting(true);
    }
  }

  const handleSelectCard = (card: PokerCard) => {
    setSelecting(false);
    props.setValue(getNewEstimation(card, props.room, props.rooms, props.user));
  }

  const estimation = (): (number|string)[] | null => {
    const { discovered, users } = props.room;
    return discovered ? getEstimation(users) : null;
  }

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

      {isAdmin(props.user.email)(props.room.users) && (
        <RoomButtonsSet handleReset={handleReset} handleShowDown={handleShowDown} />
      )}

      {isSelecting && <SelectCard handleSelect={handleSelectCard} />}
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
