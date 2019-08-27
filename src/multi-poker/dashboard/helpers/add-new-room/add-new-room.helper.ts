import { RoomModel } from '@core/models';
import { prepareNewRoom } from '../prepare-new-room/prepare-new-room.helper';

export const addNewRoom = (
  room: RoomModel,
) => (
  setCreateRoom: (value: boolean) => void,
  handleNavigate: (room: RoomModel) => void,
  addRoom: (room: RoomModel) => void,
) => {
  const newRoom = prepareNewRoom(room);
  setCreateRoom(false);
  addRoom(newRoom);
  handleNavigate(newRoom);
};
