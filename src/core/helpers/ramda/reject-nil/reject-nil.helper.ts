import * as R from 'ramda';

export const rejectNil =
  R.map(R.reject(R.isNil));
