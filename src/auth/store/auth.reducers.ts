import * as R from 'ramda';
import { AuthStateModel } from '../models/auth.models';
import { USER_ROLE } from '../../core/models/user.models';
import {
  AUTH_ACTIONS, AuthActions,
  SignInAction, SignInSuccessAction, SignInErrorAction, SignOutAction, signOut,
} from './auth.actions';

const initialState: AuthStateModel = {
  isPending: false,
  model: {
    email: '',
    id: '',
    role: USER_ROLE.USER,
  },
  error: {},
};

const signInReducer = (_: SignInAction) =>
  R.assoc('isPending', true);

const signInSuccessReducer = (action: SignInSuccessAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('model', action.payload),
);

const signInErrorReducer = (action: SignInErrorAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('error', action.payload),
);

const signOutReducer = (_: SignOutAction) => R.pipe(
  R.assoc('isPending', true),
  R.assoc('model', {}),
);

const signOutSuccessReducer = (_: SignOutAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('model', {}),
);

const signOutErrorReducer = (action: SignOutAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('error', action.payload),
);

const reducers = {
  [AUTH_ACTIONS.SIGN_IN]: signInReducer,
  [AUTH_ACTIONS.SIGN_IN_SUCCESS]: signInSuccessReducer,
  [AUTH_ACTIONS.SIGN_IN_ERROR]: signInErrorReducer,
  [AUTH_ACTIONS.SIGN_OUT]: signOutReducer,
  [AUTH_ACTIONS.SIGN_OUT_SUCCESS]: signOutSuccessReducer,
  [AUTH_ACTIONS.SIGN_OUT_ERROR]: signOutErrorReducer,
};

const selectReducer = (type: AUTH_ACTIONS): any =>
  reducers[type] || R.always(R.identity);

export function authReducer(state = initialState, action: AuthActions) {
  return selectReducer(action.type)(action)(state);
}
