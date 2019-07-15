import * as R from 'ramda';

export const isRiskCard = R.both(
  R.is(String),
  R.includes('risk'),
);
