import { combineEpics } from 'redux-observable';
import { signInEpic, signInSuccessEpic, signOutEpic } from '../multi-poker/auth/store/auth.epics';

export const epics = combineEpics(
  signInEpic,
  signInSuccessEpic,
  signOutEpic,
);
