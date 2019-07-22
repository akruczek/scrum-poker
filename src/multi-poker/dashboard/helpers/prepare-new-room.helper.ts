import { getNewRoomId } from './get-new-room-id.helper';
import { RoomModel } from '../../models/room.models';

export const prepareNewRoom = (room: RoomModel, rooms: RoomModel[]) => ({
  room: {
    id: getNewRoomId(rooms),
    ...room,
  },
  index: rooms.length,
});
