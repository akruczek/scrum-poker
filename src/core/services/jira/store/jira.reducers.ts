import * as R from 'ramda';
import { JiraStateModel } from '../../../models';
import { JiraActions, JIRA_ACTIONS } from './jira.actions';

const initialState: JiraStateModel = {
  isPending: false,
  error: false,
  success: false,
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

const clearJiraStatusReducer = (_: JiraActions) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('success', false),
  R.assoc('error', false),
);

const reducers = {
  [JIRA_ACTIONS.SET_ISSUE_STORY_POINTS]: setIssueReducer,
  [JIRA_ACTIONS.SET_ISSUE_STORY_POINTS_SUCCESS]: setIssueSuccessReducer,
  [JIRA_ACTIONS.SET_ISSUE_STORY_POINTS_ERROR]: setIssueErrorReducer,
  [JIRA_ACTIONS.GET_ISSUE]: getIssueReducer,
  [JIRA_ACTIONS.GET_ISSUE_SUCCESS]: getIssueSuccessReducer,
  [JIRA_ACTIONS.GET_ISSUE_ERROR]: getIssueErrorReducer,
  [JIRA_ACTIONS.CLEAR_JIRA_STATUS]: clearJiraStatusReducer,
};

const selectReducer = (type: JIRA_ACTIONS): any =>
  reducers[type] || R.always(R.identity);

export function jiraReducer(state = initialState, action: JiraActions) {
  return selectReducer(action.type)(action)(state);
}
