import * as R from 'ramda';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';
import { getRoomIndex } from '../get-room-index/get-room-index.helper';
import { USER_ROLE } from '../../../../core/models/user.models';

export const getNewUser = (
  user: UserModel,
  room: RoomModel,
  rooms: RoomModel[],
) => {
  const shouldBeAdmin = room.allAdmins || R.isEmpty(room.users);

  return {
    user: {
      ...user,
      role: shouldBeAdmin ? USER_ROLE.ADMIN : USER_ROLE.USER,
    },
    index: (room.users || []).length,
    roomIndex: getRoomIndex(room.id)(rooms),
  }
};
