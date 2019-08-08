import { USER_ROLE } from '@core/models/user.models';
import { parseEmailToId } from '@core/helpers';
import { isBlank } from '@core/helpers';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';
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
