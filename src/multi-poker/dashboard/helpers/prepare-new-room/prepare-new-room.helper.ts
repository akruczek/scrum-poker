import { RoomModel } from '../../../models/room.models';
import uuidv1 from 'uuid/v1';

export const prepareNewRoom = (room: RoomModel): RoomModel => ({
  id: uuidv1(),
  ...room,
});
