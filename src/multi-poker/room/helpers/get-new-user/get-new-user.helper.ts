import { USER_ROLE, UserModel, RoomModel } from '@core/models';
import { parseEmailToId, isBlank } from '@core/helpers';
import { AddUserPayload } from '../../../dashboard/store/dashboard.actions';

export const getNewUser = (user: UserModel, room: RoomModel): AddUserPayload => {
  const shouldBeAdmin = room.allAdmins || isBlank(room.users);

  return {
    user: {
      ...user,
      id: parseEmailToId(user.email),
      role: shouldBeAdmin ? USER_ROLE.ADMIN : USER_ROLE.USER,
    },
    roomId: room.id,
  };
};
