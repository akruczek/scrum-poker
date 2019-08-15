import * as R from 'ramda';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';

export const updateRoomProperties = (
  newRoom: RoomModel,
  currentRoom: RoomModel,
) => (
  updateRoom: (room: RoomModel) => void,
  setEditingRoom: (value: boolean) => void,
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

  updateRoom({
    ...currentRoom,
    ...newRoom,
    discovered, users,
  });
  setEditingRoom(false);
};
