import uuidv1 from 'uuid/v1';
import { RoomModel } from '@core/models';

export const prepareNewRoom = (room: RoomModel): RoomModel => ({
  id: uuidv1(),
  ...room,
});
