import { combineEpics } from 'redux-observable';
import { signInEpic, signInSuccessEpic, signOutEpic } from '../multi-poker/auth/store/auth.epics';
import { addRoomEpic, removeRoomEpic } from '../multi-poker/dashboard/store/dashboard.epics';

export const epics = combineEpics(
  signInEpic,
  signInSuccessEpic,
  signOutEpic,
  addRoomEpic,
  removeRoomEpic,
);
