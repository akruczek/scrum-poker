import * as R from 'ramda';
import { USER_ROLE } from '@core/models';

export const isAdmin = (email: string) => R.pipe(
  R.find(R.propEq('email', email)),
  R.prop('role'),
  R.equals(USER_ROLE.ADMIN),
);
