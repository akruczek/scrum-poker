import * as R from 'ramda';

export const _cond = (...values: any[]) =>
  R.cond(
    R.map(
      (index: number) => [ R.always(values[index]), R.always(values[index + 1]) ],
      R.times(
        R.multiply(2),
        Math.floor(values.length / 2),
      ),
    ),
  )();
