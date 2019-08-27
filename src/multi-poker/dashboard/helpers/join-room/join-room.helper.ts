import { SCREENS } from '@core/navigation/screens';
import { RoomModel } from '@core/models';

export const joinRoom = (
  setRoom: (room: RoomModel) => void,
  navigate: (screen: SCREENS) => void,
  room: RoomModel,
): void => {
  setRoom(room);
  navigate(SCREENS.ROOM);
};
