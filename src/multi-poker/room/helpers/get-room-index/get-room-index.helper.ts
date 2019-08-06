import * as R from 'ramda';
import { RoomModel } from '../../../models/room.models';

export const getRoomIndex = (id: number | string) => R.findIndex(
  room => R.propOr('', 'id', room) === id,
);
