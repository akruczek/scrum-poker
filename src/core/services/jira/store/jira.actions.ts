import { Action } from 'redux';
import { newAction } from '@core/helpers';
import {
  SetIssueStoryPointsPayload, JiraAuthModel, JiraUserModel, JiraConfigurationModel,
} from '../../../models';

export enum JIRA_ACTIONS {
  GET_ISSUE = '[Jira]: Get issue',
  GET_ISSUE_SUCCESS = '[Jira]: Get issue success',
  GET_ISSUE_ERROR = '[Jira]: Get issue error',
  SET_ISSUE_STORY_POINTS = '[Jira]: Set issue story points',
  SET_ISSUE_STORY_POINTS_SUCCESS = '[Jira]: Set issue story points success',
  SET_ISSUE_STORY_POINTS_ERROR = '[Jira]: Set issue story points error',
  SET_JIRA_CONFIGURATION = '[Jira]: Set Jira configuration',
  SET_JIRA_CONFIGURATION_SUCCESS = '[Jira]: Set Jira configuration success',
  SET_JIRA_CONFIGURATION_ERROR = '[Jira]: Set Jira configuration error',
  GET_JIRA_CONFIGURATION = '[Jira]: Get Jira configuration',
  GET_JIRA_CONFIGURATION_SUCCESS = '[Jira]: Get Jira configuration success',
  GET_JIRA_CONFIGURATION_ERROR = '[Jira]: Get Jira configuration error',
  AUTH_JIRA = '[Jira]: Auth Jira',
  AUTH_JIRA_SUCCESS = '[Jira]: Auth Jira success',
  AUTH_JIRA_ERROR = '[Jira]: Auth Jira error',
  SIGN_OUT = '[Jira]: Sign out',
  SIGN_OUT_SUCCESS = '[Jira]: Sign out success',
  SIGN_OUT_ERROR = '[Jira]: Sign out error',
  INITIALIZE = '[Jira]: initialize',
  CLEAR_JIRA_STATUS = '[Jira]: Clear jira status',
}

export interface SetIssueStoryPointsAction extends Action {
  payload: SetIssueStoryPointsPayload;
}

export interface GetIssueAction extends Action {
  payload: string;
}

export interface GetIssueSuccessAction extends Action {
  payload: any;
}

export interface AuthJiraAction extends Action {
  payload: JiraAuthModel;
}

export interface SetJiraConfigurationAction extends Action {
  payload: JiraConfigurationModel;
}

export type JiraActions =
  SetIssueStoryPointsAction &
  GetIssueAction &
  GetIssueSuccessAction &
  AuthJiraAction &
  SetJiraConfigurationAction;

export const getIssue =
  newAction<JIRA_ACTIONS, string>(JIRA_ACTIONS.GET_ISSUE);
export const getIssueSuccess =
  newAction<JIRA_ACTIONS, any>(JIRA_ACTIONS.GET_ISSUE_SUCCESS);
export const getIssueError =
  newAction<JIRA_ACTIONS, any>(JIRA_ACTIONS.GET_ISSUE_ERROR);

export const setIssueStoryPoints =
  newAction<JIRA_ACTIONS, SetIssueStoryPointsPayload>(JIRA_ACTIONS.SET_ISSUE_STORY_POINTS);
export const setIssueStoryPointsSuccess =
  newAction<JIRA_ACTIONS, {}>(JIRA_ACTIONS.SET_ISSUE_STORY_POINTS_SUCCESS);
export const setIssueStoryPointsError =
  newAction<JIRA_ACTIONS, any>(JIRA_ACTIONS.SET_ISSUE_STORY_POINTS_ERROR);

export const setJiraConfiguration =
  newAction<JIRA_ACTIONS, JiraConfigurationModel>(JIRA_ACTIONS.SET_JIRA_CONFIGURATION);
export const setJiraConfigurationSuccess =
  newAction<JIRA_ACTIONS, JiraConfigurationModel>(JIRA_ACTIONS.SET_JIRA_CONFIGURATION_SUCCESS);
export const setJiraConfigurationError =
  newAction<JIRA_ACTIONS, any>(JIRA_ACTIONS.SET_JIRA_CONFIGURATION_ERROR);

export const getJiraConfiguration =
  newAction<JIRA_ACTIONS, {}>(JIRA_ACTIONS.GET_JIRA_CONFIGURATION);
export const getJiraConfigurationSuccess =
  newAction<JIRA_ACTIONS, JiraConfigurationModel>(JIRA_ACTIONS.GET_JIRA_CONFIGURATION_SUCCESS);
export const getJiraConfigurationError =
  newAction<JIRA_ACTIONS, any>(JIRA_ACTIONS.GET_JIRA_CONFIGURATION_ERROR);

export const authJira =
  newAction<JIRA_ACTIONS, JiraAuthModel>(JIRA_ACTIONS.AUTH_JIRA);
export const authJiraSuccess =
  newAction<JIRA_ACTIONS, JiraUserModel | Response>(JIRA_ACTIONS.AUTH_JIRA_SUCCESS);
export const authJiraError =
  newAction<JIRA_ACTIONS, any>(JIRA_ACTIONS.AUTH_JIRA_ERROR);

export const jiraSignOut =
  newAction<JIRA_ACTIONS, {}>(JIRA_ACTIONS.SIGN_OUT);
export const jiraSignOutSuccess =
  newAction<JIRA_ACTIONS, {}>(JIRA_ACTIONS.SIGN_OUT_SUCCESS);
export const jiraSignOutError =
  newAction<JIRA_ACTIONS, any>(JIRA_ACTIONS.SIGN_OUT_ERROR);

export const clearJiraStatus =
  newAction<JIRA_ACTIONS, {}>(JIRA_ACTIONS.CLEAR_JIRA_STATUS);

export const initializeJira =
  newAction<JIRA_ACTIONS, {}>(JIRA_ACTIONS.INITIALIZE);
