import * as R from 'ramda';

// const divergences = R.pipe<number[], number[], number[]>(
//   R.uniq,
//   (values: number[]) => [ Math.max(...values), Math.min(...values) ],
// )(estimations);

// export const isEqualDivergence = R.any(
//   R.equals(R.propOr(null, 'value', user.selectedValue)),
// )(divergences);

export const isEqualDivergence = (selectedValue: number) => R.pipe<number[], number[], number[], any>(
  R.uniq,
  (values: number[]) => [ Math.max(...values), Math.min(...values) ],
  R.any(R.equals(selectedValue)),
);
