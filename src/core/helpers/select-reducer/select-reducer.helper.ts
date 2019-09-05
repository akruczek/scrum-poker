import * as R from 'ramda';

export const selectReducer = <T>(type: T, reducers: any): any =>
  reducers[type] || R.always(R.identity);
