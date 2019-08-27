import { ActionsObservable, ofType } from 'redux-observable';
import { pluck, switchMap } from 'rxjs/operators';
import { Storage } from '@core/services/device-storage/device-storage.service';
import { Firebase } from '@core/services/firebase/firebase.service';
import { EMPTY_ACTION } from '@core/constants';
import { UserModel } from '@core/models';
import { isPresent } from '@core/helpers';
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
  .multiDelete([ 'userEmail', 'userJiraSpaceName', 'userJiraEmail', 'userJiraToken' ])
  .then(() => signOutSuccess())
  .catch(signOutError)

export const signOutEpic = (action: ActionsObservable<SignOutAction>) => action
  .pipe(
    ofType(AUTH_ACTIONS.SIGN_OUT),
    switchMap(signOut),
  );

const initializeAuth = () => Storage
  .get('userEmail')
  .then(payload => (isPresent(payload) && payload) ? signIn(payload) : signInError());

export const initializeAuthEpic = (action: ActionsObservable<SignOutAction>) => action
  .pipe(
    ofType(AUTH_ACTIONS.INITIALIZE),
    switchMap(initializeAuth),
  );
