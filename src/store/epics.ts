import { combineEpics } from 'redux-observable';
import { signInEpic, signInSuccessEpic, signOutEpic } from '../auth/store/auth.epics';
import {
  addRoomEpic, removeRoomEpic, addUserEpic, showDownEpic, resetEpic, setValueEpic,
} from '../multi-poker/dashboard/store/dashboard.epics';

export const epics = combineEpics(
  signInEpic,
  signInSuccessEpic,
  signOutEpic,
  addRoomEpic,
  removeRoomEpic,
  addUserEpic,
  showDownEpic,
  resetEpic,
  setValueEpic,
);
