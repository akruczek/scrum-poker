import * as R from 'ramda';
import { UserModel } from '@core/models';

export const getListedUserValues = (user: UserModel) => [
  R.pathOr(null, [ 'selectedValue', 'value' ], user),
  R.pathOr('?', [ 'selectedValue', 'label' ], user),
];
