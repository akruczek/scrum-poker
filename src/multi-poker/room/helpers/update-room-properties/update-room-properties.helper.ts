import * as R from 'ramda';
import { UserModel, RoomModel } from '@core/models';

export const updateRoomProperties = (
  newRoom: RoomModel,
  currentRoom: RoomModel,
) => (
  updateRoom: (room: RoomModel) => void,
  setEditingRoom: (value: boolean) => void,
  setParams: (payload: {[key: string]: string}) => void,
) => {
  const isPokerChange = !R.eqProps('poker', newRoom, currentRoom);

  const users: { [key: string]: UserModel } = R.when(
    () => isPokerChange,
    R.mapObjIndexed(R.dissoc('selectedValue')),
  )(currentRoom.users);

  const discovered = R.when(
    () => isPokerChange,
    R.always(false),
  )(currentRoom.discovered);

  if (!R.eqProps('name', currentRoom, newRoom)) {
    setParams({ roomName: newRoom.name });
  }

  updateRoom({
    ...currentRoom,
    ...newRoom,
    discovered, users,
  });

  setEditingRoom(false);
};
