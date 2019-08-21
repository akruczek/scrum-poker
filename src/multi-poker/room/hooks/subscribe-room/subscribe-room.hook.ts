import * as React from 'react';
import * as R from 'ramda';
import { NavigationScreenProp } from 'react-navigation';
import { Firebase } from '@core/services/firebase/firebase.service';
import { addDefaultUser, hasAdmin } from '../../helpers';
import { RoomModel } from '../../../models/room.models';
import { UserModel } from '../../../../auth/models/auth.models';
import { AddUserPayload } from '../../../dashboard/store/dashboard.actions';

export const useSubscribeRoom = (
  room: RoomModel,
  user: UserModel,
  jiraAccountId: string,
  navigation: NavigationScreenProp<any, any>
) => (
  addUser: (user: AddUserPayload) => void,
  setRoom: (room: RoomModel) => void,
  setEditingRoom: (value: boolean) => void,
) => {
  const [ users, setUsers ] = React.useState<UserModel[]>([]);

  const getUsers = (room: RoomModel) => {
    setUsers(R.values<RoomModel, any>(R.propOr([], 'users', room)));
    setRoom(room);
  };
  
  React.useEffect(() => {
    Firebase.subscribe(`/rooms/${room.id}`, getUsers);
    addDefaultUser(user, room)(addUser);

    navigation.setParams({
      handleEditRoom: () => setEditingRoom(true),
      isAdmin: jiraAccountId && (R.isEmpty(users) || hasAdmin(user.email, room.users, jiraAccountId)),
    });

    return () => {
      Firebase.unsubscribe(`/rooms/${room.id}`);
    };
  }, []);

  return users || [];
};
