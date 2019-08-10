import { Action } from 'redux';
import { SetIssueStoryPointsPayload, JiraAuthModel, JiraUserModel } from '../../../models';

export enum JIRA_ACTIONS {
  GET_ISSUE = '[Jira]: Get issue',
  GET_ISSUE_SUCCESS = '[Jira]: Get issue success',
  GET_ISSUE_ERROR = '[Jira]: Get issue error',
  SET_ISSUE_STORY_POINTS = '[Jira]: Set issue story points',
  SET_ISSUE_STORY_POINTS_SUCCESS = '[Jira]: Set issue story points success',
  SET_ISSUE_STORY_POINTS_ERROR = '[Jira]: Set issue story points error',
  CLEAR_JIRA_STATUS = '[Jira]: Clear jira status',
  AUTH_JIRA = '[Jira]: Auth Jira',
  AUTH_JIRA_SUCCESS = '[Jira]: Auth Jira success',
  AUTH_JIRA_ERROR = '[Jira]: Auth Jira error',
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

export type JiraActions =
  SetIssueStoryPointsAction &
  GetIssueAction &
  GetIssueSuccessAction &
  AuthJiraAction;

const newAction = <P>(type: JIRA_ACTIONS) =>
  (payload?: P): { type: JIRA_ACTIONS, payload?: P } => ({ type, payload });

export const getIssue =
  newAction<string>(JIRA_ACTIONS.GET_ISSUE);
export const getIssueSuccess =
  newAction<any>(JIRA_ACTIONS.GET_ISSUE_SUCCESS);
export const getIssueError =
  newAction<any>(JIRA_ACTIONS.GET_ISSUE_ERROR);

export const setIssueStoryPoints =
  newAction<SetIssueStoryPointsPayload>(JIRA_ACTIONS.SET_ISSUE_STORY_POINTS);
export const setIssueStoryPointsSuccess =
  newAction<{}>(JIRA_ACTIONS.SET_ISSUE_STORY_POINTS_SUCCESS);
export const setIssueStoryPointsError =
  newAction<any>(JIRA_ACTIONS.SET_ISSUE_STORY_POINTS_ERROR);

export const authJira =
  newAction<JiraAuthModel>(JIRA_ACTIONS.AUTH_JIRA);
export const authJiraSuccess =
  newAction<JiraUserModel | Response>(JIRA_ACTIONS.AUTH_JIRA_SUCCESS);
export const authJiraError =
  newAction<any>(JIRA_ACTIONS.AUTH_JIRA_ERROR);

export const clearJiraStatus =
  newAction<{}>(JIRA_ACTIONS.CLEAR_JIRA_STATUS);
