import { combineEpics } from 'redux-observable';
import { signInEpic } from '../multi-poker/auth/store/auth.epics';

export const epics = combineEpics(
  signInEpic,
);
