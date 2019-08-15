import * as R from 'ramda';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';
import { getNewUser } from '../get-new-user/get-new-user.helper';
import { AddUserPayload } from '../../../dashboard/store/dashboard.actions';

export const addDefaultUser = (
  user: UserModel,
  room: RoomModel,
) => (
  addUser: (user: AddUserPayload) => void,
) => {
  const isUserIn = R.any(
    R.propEq('email', user.email)
  )(R.values(room.users || {}));

  if (!isUserIn) {
    addUser(getNewUser(user, room));
  }
};
