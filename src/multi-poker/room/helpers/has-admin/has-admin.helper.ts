import * as R from 'ramda';
import { isAdmin } from '../is-admin/is-admin.helper';
import { UserModel } from '../../../../auth/models/auth.models';

export const hasAdmin = (
  email: string,
  users: {[key: string]: UserModel},
  jiraAccountId: string,
) => R.both(
  isAdmin(email),
  () => !!jiraAccountId,
)(R.values(users || {}));
