import * as R from 'ramda';
import { ActionsObservable, ofType } from 'redux-observable';
import { pluck, switchMap } from 'rxjs/operators';
import { Firebase } from '../../../core/services/firebase/firebase.service';
import { SignInAction, AUTH_ACTIONS, signInError, signInSuccess } from './auth.actions';
import { UserModel } from '../../../core/models/auth.models';

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
