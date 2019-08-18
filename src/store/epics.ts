import { combineEpics } from 'redux-observable';
import {
  signInEpic, signInSuccessEpic, signOutEpic, initializeAuthEpic,
} from '../auth/store/auth.epics';
import {
  getTranslationsEpic, setLanguageEpic, setLanguageSuccessEpic, initializeTranslationsEpic,
} from '@core/services/translations/store/translations.epics';
import {
  addRoomEpic, removeRoomEpic, addUserEpic, showDownEpic, resetEpic, setValueEpic, updateRoomEpic,
} from '../multi-poker/dashboard/store/dashboard.epics';
import {
  initializeJiraEpic,
  setIssueStoryPointsEpic, getIssueEpic,
  authJiraEpic, authJiraSuccessEpic,
  jiraSignOutEpic, setJiraConfigurationEpic, getJiraConfigurationEpic,
} from '@core/services/jira/store/jira.epics';

export const epics = combineEpics(
  initializeAuthEpic, initializeJiraEpic, initializeTranslationsEpic,
  signInEpic, signInSuccessEpic, signOutEpic,
  addRoomEpic, removeRoomEpic, updateRoomEpic,
  showDownEpic, resetEpic, setValueEpic, setIssueStoryPointsEpic, addUserEpic,
  getTranslationsEpic, setLanguageEpic, setLanguageSuccessEpic,
  getIssueEpic,
  authJiraEpic, authJiraSuccessEpic, jiraSignOutEpic, setJiraConfigurationEpic, getJiraConfigurationEpic,
);
