import * as R from 'ramda';

export const isEqualDivergence = (selectedValue: number) => R.pipe<number[], number[], number[], any>(
  R.uniq,
  (values: number[]) => [ Math.max(...values), Math.min(...values) ],
  R.any(R.equals(selectedValue)),
);
