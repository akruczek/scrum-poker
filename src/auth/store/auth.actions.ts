import { Action } from 'redux';
import { UserModel } from '../models/auth.models';

export enum AUTH_ACTIONS {
  SIGN_IN = '[Auth]: Sign in',
  SIGN_IN_SUCCESS = '[Auth]: Sign in success',
  SIGN_IN_ERROR = '[Auth]: Sign in error',
  SIGN_OUT = '[Auth]: Sign out',
  SIGN_OUT_SUCCESS = '[Auth]: Sign out success',
  SIGN_OUT_ERROR = '[Auth]: Sign out error',
  INITIALIZE = '[Auth]: Initialize',
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

export interface SignOutAction extends Action {
  payload: {};
}

export type AuthActions =
  SignInAction &
  SignInSuccessAction &
  SignInErrorAction &
  SignOutAction;

const newAction = <P>(type: AUTH_ACTIONS) =>
  (payload?: P): { type: AUTH_ACTIONS, payload?: P } => ({ type, payload });

export const signIn = newAction<string>(AUTH_ACTIONS.SIGN_IN);
export const signInSuccess = newAction<UserModel>(AUTH_ACTIONS.SIGN_IN_SUCCESS);
export const signInError = newAction<any>(AUTH_ACTIONS.SIGN_IN_ERROR);

export const signOut = newAction<{}>(AUTH_ACTIONS.SIGN_OUT);
export const signOutSuccess = newAction<{}>(AUTH_ACTIONS.SIGN_OUT_SUCCESS);
export const signOutError = newAction<{}>(AUTH_ACTIONS.SIGN_OUT_ERROR);

export const initializeAuth = newAction<{}>(AUTH_ACTIONS.INITIALIZE);
