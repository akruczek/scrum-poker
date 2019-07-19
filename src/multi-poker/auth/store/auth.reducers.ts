import * as R from 'ramda';
import { AuthStateModel } from '../../../core/models/auth.models';
import { AUTH_ACTIONS, AuthActions, SetUserAction } from './auth.actions';

const initialState: AuthStateModel = {
  isPending: false,
  model: {
    email: '',
  },
};

const setUserReducer = (action: SetUserAction) =>
  R.assoc('model', action.payload);

const reducers = {
  [AUTH_ACTIONS.SET_USER]: setUserReducer,
};

const selectReducer = (type: AUTH_ACTIONS): any =>
  reducers[type] || R.always(R.identity);

export function authReducer(state = initialState, action: AuthActions) {
  return selectReducer(action.type)(action)(state);
}
