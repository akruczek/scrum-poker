import * as R from 'ramda';
import { AppState } from '../../../../store/reducers';
import { UserModel } from '../../../../core/models';

export const filterUsers = (state: AppState) => {
  const users = R.pipe(
    R.pathOr({}, [ 'rooms', 'model', 'users' ]),
    R.values,
  )(state);
  const email = R.pathOr('', [ 'auth', 'model', 'email' ], state);

  return R.pipe<UserModel[], UserModel[], UserModel, {[key: string]: UserModel}>(
    R.filter(R.propEq('email', email)),
    R.head,
    (user: UserModel) => ({ [user.id]: user }),
  )(users);
};
