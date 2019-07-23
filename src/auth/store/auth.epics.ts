import { ActionsObservable, ofType } from 'redux-observable';
import { pluck, switchMap } from 'rxjs/operators';
import { Firebase } from '../../core/services/firebase/firebase.service';
import { Storage } from '../../core/services/device-storage/device-storage.service';
import { EMPTY_ACTION } from '../../core/constants/store';
import { UserModel } from '../models/auth.models';
import {
  AUTH_ACTIONS,
  SignInAction, signInError, signInSuccess, SignInSuccessAction,
  SignOutAction, signOutSuccess, signOutError,
} from './auth.actions';

const signIn = (email: string) => Firebase
  .signIn(email, 'password')
  .then((user: UserModel) => signInSuccess(user))
  .catch(signInError);

export const signInEpic = (action: ActionsObservable<SignInAction>) => action
  .pipe(
    ofType(AUTH_ACTIONS.SIGN_IN),
    pluck('payload'),
    switchMap(signIn),
  );

const saveUser = (user: UserModel) => Storage
  .set('userEmail', user.email)
  .then(() => EMPTY_ACTION)
  .catch(signInError);

export const signInSuccessEpic = (action: ActionsObservable<SignInSuccessAction>) => action
  .pipe(
    ofType(AUTH_ACTIONS.SIGN_IN_SUCCESS),
    pluck('payload'),
    switchMap(saveUser),
  );

const signOut = () => Storage
  .delete('userEmail')
  .then(() => signOutSuccess())
  .catch(signOutError)

export const signOutEpic = (action: ActionsObservable<SignOutAction>) => action
  .pipe(
    ofType(AUTH_ACTIONS.SIGN_OUT),
    switchMap(signOut),
  );
