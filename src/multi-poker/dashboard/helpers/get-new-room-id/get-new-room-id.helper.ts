import * as R from 'ramda';
import { RoomModel } from '../../../models/room.models';

export const getNewRoomId = R.ifElse(
  R.isEmpty,
  R.always(0),
  R.pipe<RoomModel[], {}[], {}[], number[], number, number>(
    R.map(R.prop('id')),
    R.reject(R.isNil),
    R.map(Number),
    values => Math.max(...values),
    R.inc,
  ),
);
