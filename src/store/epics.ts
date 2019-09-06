import { combineEpics } from 'redux-observable';
import { addRoomEpic, removeRoomEpic, resetUsersEpic } from '../multi-poker/dashboard/store/dashboard.epics';
import {
  signInEpic, signInSuccessEpic, signOutEpic, initializeAuthEpic,
} from '../auth/store/auth.epics';
import {
  updateRoomEpic, showDownEpic, resetEpic, setValueEpic, addUserEpic,
} from '../multi-poker/room/store/room.epics';
import {
  getTranslationsEpic, setLanguageEpic, setLanguageSuccessEpic, initializeTranslationsEpic,
} from '@core/services/translations/store/translations.epics';
import {
  initializeJiraEpic,
  setIssueStoryPointsEpic, getIssueEpic, getProjectsEpic,
  authJiraEpic, authJiraSuccessEpic,
  jiraSignOutEpic, setJiraConfigurationEpic, getJiraConfigurationEpic, getProjectIssuesEpic,
} from '@core/services/jira/store/jira.epics';

export const epics = combineEpics(
  initializeAuthEpic, initializeJiraEpic, initializeTranslationsEpic,
  signInEpic, signInSuccessEpic, signOutEpic,
  addRoomEpic, removeRoomEpic, updateRoomEpic, resetUsersEpic,
  showDownEpic, resetEpic, setValueEpic, setIssueStoryPointsEpic, addUserEpic,
  getTranslationsEpic, setLanguageEpic, setLanguageSuccessEpic,
  getIssueEpic, getProjectsEpic, getProjectIssuesEpic,
  authJiraEpic, authJiraSuccessEpic, jiraSignOutEpic, setJiraConfigurationEpic, getJiraConfigurationEpic,
);
