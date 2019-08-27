import * as R from 'ramda';

export const getRoomIndex = (id: number | string) => R.findIndex(
  room => R.propOr('', 'id', room) === id,
);
