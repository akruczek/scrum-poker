import * as R from 'ramda';
import { RoomModel } from '../../../models/room.models';

export const getResetPayload = (room: RoomModel): RoomModel => ({
  ...room,
  discovered: false,
  users: R.zipObj(
    R.keys(room.users) as any,
    R.map(user => ({ ...user, selectedValue: null }))(R.values(room.users)),
  ) as any,
});
