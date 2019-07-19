import { Action } from 'redux';

export enum AUTH_ACTIONS {
  SET_USER = '[Auth]: Set user',
}

export interface SetUserAction extends Action {
  payload: boolean;
}

export type AuthActions = SetUserAction;

const newAction = <P>(type: AUTH_ACTIONS) =>
  (payload?: P): { type: AUTH_ACTIONS, payload?: P } => ({ type, payload });

export const setUser = newAction<boolean>(AUTH_ACTIONS.SET_USER);
