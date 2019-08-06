import { RoomModel } from '../../../models/room.models';
import { SCREENS } from '../../../../core/navigation/screens';

export const joinRoom = (
  setRoom: (room: RoomModel) => void,
  navigate: (screen: SCREENS) => void,
  room: RoomModel,
): void => {
  setRoom(room);
  navigate(SCREENS.ROOM);
};
