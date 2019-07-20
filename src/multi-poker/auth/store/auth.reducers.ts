import * as R from 'ramda';
import { AuthStateModel } from '../../../core/models/auth.models';
import {
  AUTH_ACTIONS, AuthActions,
  SignInAction, SignInSuccessAction, SignInErrorAction,
} from './auth.actions';

const initialState: AuthStateModel = {
  isPending: false,
  model: {
    email: '',
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

const reducers = {
  [AUTH_ACTIONS.SIGN_IN]: signInReducer,
  [AUTH_ACTIONS.SIGN_IN_SUCCESS]: signInSuccessReducer,
  [AUTH_ACTIONS.SIGN_IN_ERROR]: signInErrorReducer,
};

const selectReducer = (type: AUTH_ACTIONS): any =>
  reducers[type] || R.always(R.identity);

export function authReducer(state = initialState, action: AuthActions) {
  return selectReducer(action.type)(action)(state);
}
