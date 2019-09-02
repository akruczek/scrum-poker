import * as React from 'react';
import * as R from 'ramda';
import { NavigationScreenProp } from 'react-navigation';
import { Firebase } from '@core/services/firebase/firebase.service';
import { RoomModel, UserModel } from '@core/models';
import { addDefaultUser, hasAdmin } from '../../helpers';
import { AddUserPayload } from '../../../dashboard/store/dashboard.actions';
import { isPresent } from '../../../../core/helpers';

export const useSubscribeRoom = (
  room: RoomModel,
  user: UserModel,
  jiraAccountId: string,
  navigation: NavigationScreenProp<any, any>
) => (
  addUser: (user: AddUserPayload) => void,
  setRoom: (room: RoomModel) => void,
  setEditingRoom: (value: boolean) => void,
  forceQuitRoom: () => void,
) => {
  const [ users, setUsers ] = React.useState<UserModel[]>([]);

  const getUsers = (room: RoomModel) => {
    setUsers(R.values<RoomModel, any>(R.propOr([], 'users', room)));
    setRoom(room);
  };

  const handleSubscribeRoom = (room: RoomModel) => {
    if (isPresent(room)) {
      getUsers(room);
    } else {
      forceQuitRoom();
    }
  };
  
  React.useEffect(() => {
    Firebase.subscribe(`/rooms/${room.id}`, handleSubscribeRoom);
    addDefaultUser(user, room)(addUser);

    navigation.setParams({
      handleEditRoom: () => setEditingRoom(true),
      isAdmin: jiraAccountId && (R.isEmpty(users) || hasAdmin(user.email, room.users, jiraAccountId)),
      roomName: room.name,
    });

    return () => {
      Firebase.unsubscribe(`/rooms/${room.id}`);
    };
  }, []);

  return users || [];
};
