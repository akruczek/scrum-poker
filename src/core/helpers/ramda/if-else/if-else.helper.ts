import * as R from 'ramda';

export const ifElse = (condition: any, _if: any, _else: any) => R.ifElse(
  () => Boolean(condition),
  () => _if,
  () => _else,
)({});