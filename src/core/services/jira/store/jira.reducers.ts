import * as R from 'ramda';
import { JiraStateModel } from '../../../models';
import { JiraActions, JIRA_ACTIONS, AuthJiraAction, SetJiraConfigurationAction } from './jira.actions';
import { AUTH_ACTIONS, AuthActions } from '../../../../auth/store/auth.actions';

const initialState: JiraStateModel = {
  isPending: false,
  error: false,
  success: false,
  auth: null,
  user: null,
  configuration: null,
  projects: null,
  issues: null,
};

const setIssueReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', true),
  R.assoc('success', false),
  R.assoc('error', false),
);

const setIssueSuccessReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('success', true),
);

const setIssueErrorReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('success', false),
  R.assoc('error', true),
);

const setJiraConfigurationReducer = (action: SetJiraConfigurationAction) => R.pipe(
  R.assoc('isPending', true),
  R.assoc('configuration', action.payload),
);

const setJiraConfigurationSuccessReducer = (_: SetJiraConfigurationAction) => R.pipe(
  R.assoc('isPending', false),
);

const setJiraConfigurationErrorReducer = (_: SetJiraConfigurationAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('configuration', null),
);

const getJiraConfigurationReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', true),
);

const getJiraConfigurationSuccessReducer = (action: JiraActions) => R.pipe(
  R.assoc('configuration', action.payload),
  R.assoc('isPending', false),
);

const getJiraConfigurationErrorReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
);

const getIssueReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', true),
);

const getIssueSuccessReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('success', true),
  R.assoc('error', false),
);

const getIssueErrorReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('success', false),
  R.assoc('error', true),
);

const getProjectsReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', true),
);

const getProjectsSuccessReducer = (action: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('projects', action.payload),
);

const getProjectsErrorReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('error', true),
);

const getProjectIssuesReducer = (_: JiraActions) => R.pipe(
  R.assoc('error', false),
);

const getProjectIssuesSuccessReducer = (action: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('issues', action.payload),
);

const getProjectIssuesErrorReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('error', true),
);

const clearJiraStatusReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('success', false),
  R.assoc('error', false),
);

const authJiraReducer = (action: AuthJiraAction) => R.pipe(
  R.assoc('isPending', true),
  R.assoc('auth', action.payload),
);

const authJiraSuccessReducer = (action: AuthJiraAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('user', action.payload),
);

const authJiraErrorReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('auth', null),
  R.assoc('user', null),
);

const jiraSignOutErrorReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
);

const signOutReducer = (_: AuthActions) => R.always(initialState);

const reducers = {
  [JIRA_ACTIONS.SET_ISSUE_STORY_POINTS]: setIssueReducer,
  [JIRA_ACTIONS.SET_ISSUE_STORY_POINTS_SUCCESS]: setIssueSuccessReducer,
  [JIRA_ACTIONS.SET_ISSUE_STORY_POINTS_ERROR]: setIssueErrorReducer,
  [JIRA_ACTIONS.GET_ISSUE]: getIssueReducer,
  [JIRA_ACTIONS.GET_ISSUE_SUCCESS]: getIssueSuccessReducer,
  [JIRA_ACTIONS.GET_ISSUE_ERROR]: getIssueErrorReducer,
  [JIRA_ACTIONS.GET_PROJECTS]: getProjectsReducer,
  [JIRA_ACTIONS.GET_PROJECTS_SUCCESS]: getProjectsSuccessReducer,
  [JIRA_ACTIONS.GET_PROJECTS_ERROR]: getProjectsErrorReducer,
  [JIRA_ACTIONS.GET_PROJECT_ISSUES]: getProjectIssuesReducer,
  [JIRA_ACTIONS.GET_PROJECT_ISSUES_SUCCESS]: getProjectIssuesSuccessReducer,
  [JIRA_ACTIONS.GET_PROJECT_ISSUES_ERROR]: getProjectIssuesErrorReducer,
  [JIRA_ACTIONS.SET_JIRA_CONFIGURATION]: setJiraConfigurationReducer,
  [JIRA_ACTIONS.SET_JIRA_CONFIGURATION_SUCCESS]: setJiraConfigurationSuccessReducer,
  [JIRA_ACTIONS.SET_JIRA_CONFIGURATION_ERROR]: setJiraConfigurationErrorReducer,
  [JIRA_ACTIONS.GET_JIRA_CONFIGURATION]: getJiraConfigurationReducer,
  [JIRA_ACTIONS.GET_JIRA_CONFIGURATION_SUCCESS]: getJiraConfigurationSuccessReducer,
  [JIRA_ACTIONS.GET_JIRA_CONFIGURATION_ERROR]: getJiraConfigurationErrorReducer,
  [JIRA_ACTIONS.CLEAR_JIRA_STATUS]: clearJiraStatusReducer,
  [JIRA_ACTIONS.AUTH_JIRA]: authJiraReducer,
  [JIRA_ACTIONS.AUTH_JIRA_SUCCESS]: authJiraSuccessReducer,
  [JIRA_ACTIONS.AUTH_JIRA_ERROR]: authJiraErrorReducer,
  [JIRA_ACTIONS.INITIALIZE]: () => R.identity,
  [JIRA_ACTIONS.SIGN_OUT]: signOutReducer,
  [JIRA_ACTIONS.SIGN_OUT_SUCCESS]: signOutReducer,
  [JIRA_ACTIONS.SIGN_OUT_ERROR]: jiraSignOutErrorReducer,
  [AUTH_ACTIONS.SIGN_OUT]: signOutReducer,
};

const selectReducer = (type: JIRA_ACTIONS): any =>
  reducers[type] || R.always(R.identity);

export function jiraReducer(state = initialState, action: JiraActions) {
  return selectReducer(action.type)(action)(state);
}
