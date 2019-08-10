import { combineEpics } from 'redux-observable';
import { signInEpic, signInSuccessEpic, signOutEpic } from '../auth/store/auth.epics';
import { setIssueStoryPointsEpic, getIssueEpic, authJiraEpic } from '@core/services/jira/store/jira.epics';
import {
  getTranslationsEpic, setLanguageEpic, setLanguageSuccessEpic,
} from '@core/services/translations/store/translations.epics';
import {
  addRoomEpic, removeRoomEpic, addUserEpic, showDownEpic, resetEpic, setValueEpic, updateRoomEpic,
} from '../multi-poker/dashboard/store/dashboard.epics';

export const epics = combineEpics(
  signInEpic, signInSuccessEpic, signOutEpic,
  addRoomEpic, removeRoomEpic, updateRoomEpic,
  showDownEpic, resetEpic, setValueEpic, setIssueStoryPointsEpic, addUserEpic,
  getTranslationsEpic, setLanguageEpic, setLanguageSuccessEpic,
  getIssueEpic,
  authJiraEpic,
);
