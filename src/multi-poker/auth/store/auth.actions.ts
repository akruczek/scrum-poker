import { Action } from 'redux';
import { UserModel } from '../../../core/models/auth.models';

export enum AUTH_ACTIONS {
  SIGN_IN = '[Auth]: Sign in',
  SIGN_IN_SUCCESS = '[Auth]: Sign in success',
  SIGN_IN_ERROR = '[Auth]: Sign in error',
}

export interface SignInAction extends Action {
  payload: string;
}

export interface SignInSuccessAction extends Action {
  payload: UserModel;
}

export interface SignInErrorAction extends Action {
  payload: any;
}

export type AuthActions =
  SignInAction &
  SignInSuccessAction &
  SignInErrorAction;

const newAction = <P>(type: AUTH_ACTIONS) =>
  (payload?: P): { type: AUTH_ACTIONS, payload?: P } => ({ type, payload });

export const signIn = newAction<string>(AUTH_ACTIONS.SIGN_IN);
export const signInSuccess = newAction<UserModel>(AUTH_ACTIONS.SIGN_IN_SUCCESS);
export const signInError = newAction<any>(AUTH_ACTIONS.SIGN_IN_ERROR);
