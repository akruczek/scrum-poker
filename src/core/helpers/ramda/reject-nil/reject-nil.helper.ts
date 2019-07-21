import * as R from 'ramda';

export const rejectNil: any =
  R.map(R.reject(R.isNil));
