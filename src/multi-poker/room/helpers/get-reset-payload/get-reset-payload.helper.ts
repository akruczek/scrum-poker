import { RoomModel } from '../../../models/room.models';
import { getRoomIndex } from '../get-room-index/get-room-index.helper';

export const getResetPayload = (
  room: RoomModel,
  rooms: RoomModel[],
) => ({
  room: {
    ...room,
    discovered: false,
    users: room.users.map(u => ({ ...u, selectedValue: null })),
  },
  index: getRoomIndex(room.id)(rooms),
});
