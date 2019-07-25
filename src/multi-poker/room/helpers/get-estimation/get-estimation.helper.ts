import * as R from 'ramda';
import { UserModel } from '../../../../auth/models/auth.models';

export const getEstimation = R.pipe<UserModel[], any[], (number| string)[], number[]>(
  R.map(
    R.path([ 'selectedValue', 'value' ]),
  ),
  R.filter((v: number) => Number(v) !== NaN),
  R.filter(R.is(Number)),
);
