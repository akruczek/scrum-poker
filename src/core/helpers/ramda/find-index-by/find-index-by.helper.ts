import * as R from 'ramda';

export const findIndexBy = <T_value>(key: string, value: T_value) =>
  R.findIndex(v => R.equals(R.propOr(null, key, v), value));