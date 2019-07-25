import * as R from 'ramda';
import { UserModel } from '../../../../auth/models/auth.models';

export const getEstimation = R.pipe<UserModel[], any[], (number|string)[]>(
  R.map(
    R.path([ 'selectedValue', 'value' ]),
  ),
  R.map(
    R.cond([
      [ v => Number(v) !== NaN, Number ],
      [ R.is(String), R.identity ],
      [ R.T, R.always('?') ],
    ]),
  ),
);
