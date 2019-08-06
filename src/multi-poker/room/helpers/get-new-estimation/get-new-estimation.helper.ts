import * as R from 'ramda';
import { PokerCard } from '../../../../core/models';
import { getRoomIndex } from '../get-room-index/get-room-index.helper';
import { RoomModel } from '../../../models/room.models';
import { UserModel } from '../../../../auth/models/auth.models';

export const getNewEstimation = (
  card: PokerCard,
  room: RoomModel,
  rooms: RoomModel[],
  user: UserModel,
) => ({
  value: card,
  roomIndex: getRoomIndex(room.id)(rooms),
  userIndex: R.findIndex(R.propEq('email', user.email))(room.users),
});
