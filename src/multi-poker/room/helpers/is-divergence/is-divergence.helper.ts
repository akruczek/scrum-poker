import * as R from 'ramda';

export const isDivergence = R.pipe(
  R.uniq,
  R.length,
  R.gt(R.__, 2),
);
