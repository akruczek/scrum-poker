import * as R from 'ramda';
import { UserModel } from '@core/models';
import { isAdmin } from '../is-admin/is-admin.helper';

export const hasAdmin = (
  email: string,
  users: {[key: string]: UserModel},
  jiraAccountId: string,
) => R.both(
  isAdmin(email),
  () => !!jiraAccountId,
)(R.values(users || {}));
