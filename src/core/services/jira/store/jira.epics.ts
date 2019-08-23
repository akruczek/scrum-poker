import * as R from 'ramda';
import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { SetIssueStoryPointsPayload, JiraAuthModel, JiraConfigurationModel } from '../../../models';
import { Jira } from '../jira.service';
import { AppState } from '../../../../store/reducers';
import { Storage } from '../../device-storage/device-storage.service';
import { isPresent } from '../../../helpers';
import { parseJiraAuthData } from '../helpers/parse-jira-auth-data/parse-jira-auth-data.helper';
import { parseJiraConfigurationData } from '../helpers/parse-jira-configuration-data/parse-jira-configuration-data.helper';
import { parseJiraProjectsData } from '../helpers/parse-jira-projects-data/parse-jira-projects-data.helper';
import { parseJiraProjectIssues } from '../helpers/parse-jira-project-issues-data/parse-jira-project-issues-data.helper';
import {
  JIRA_ACTIONS,
  setIssueStoryPointsSuccess, SetIssueStoryPointsAction, setIssueStoryPointsError, authJira as authJiraAction,
  GetIssueAction, getIssueSuccess, getIssueError, AuthJiraAction, authJiraSuccess, authJiraError, JiraActions,
  jiraSignOutSuccess, jiraSignOutError, SetJiraConfigurationAction, setJiraConfigurationSuccess,
  setJiraConfigurationError, getJiraConfigurationSuccess, getJiraConfigurationError, getProjectsSuccess,
  getProjectsError, getProjectIssuesSuccess, getProjectIssuesError,
} from './jira.actions';

const setIssueStoryPoints = ({ issueKey, value }: SetIssueStoryPointsPayload, state: AppState) => Jira
  .put(R.pathOr({}, [ 'jira', 'auth' ], state))
  .issue(issueKey)
  .property(R.pathOr('', [ 'jira', 'configuration', 'customField' ], state))
  .set(value)
  .then(() => setIssueStoryPointsSuccess())
  .catch(error => setIssueStoryPointsError(error));

export const setIssueStoryPointsEpic = (action: ActionsObservable<SetIssueStoryPointsAction>, state: { value: AppState }) => action
  .pipe(
    ofType(JIRA_ACTIONS.SET_ISSUE_STORY_POINTS),
    pluck('payload'),
    switchMap(payload => setIssueStoryPoints(payload, state.value)),
  );

const getIssue = (issueKey: string, state: AppState) => Jira
  .get(R.pathOr({}, [ 'jira', 'auth' ], state))
  .issue(issueKey)
  .then(response => getIssueSuccess(response))
  .catch(error => getIssueError(error));

export const getIssueEpic = (action: ActionsObservable<GetIssueAction>, state: { value: AppState }) => action
  .pipe(
    ofType(JIRA_ACTIONS.GET_ISSUE),
    pluck('payload'),
    switchMap(payload => getIssue(payload, state.value)),
  );

const getProjects = (state: AppState) => Jira
  .get(R.pathOr({}, [ 'jira', 'auth' ], state))
  .projects()
  .then(response => getProjectsSuccess(parseJiraProjectsData(response)))
  .catch(error => getProjectsError(error));

export const getProjectsEpic = (action: ActionsObservable<JiraActions>, state: { value: AppState }) => action
  .pipe(
    ofType(JIRA_ACTIONS.GET_PROJECTS),
    switchMap(() => getProjects(state.value))
  );

const getProjectIssues = (state: AppState) => Jira
  .get(R.pathOr({}, [ 'jira', 'auth' ], state))
  .project(R.pathOr('', [ 'rooms', 'model', 'projectKey' ], state))
  .issues()
  .then(response => getProjectIssuesSuccess(parseJiraProjectIssues(response)))
  .catch(error => getProjectIssuesError(error));

export const getProjectIssuesEpic = (action: ActionsObservable<JiraActions>, state: { value: AppState }) => action
  .pipe(
    ofType(JIRA_ACTIONS.GET_PROJECT_ISSUES),
    switchMap(() => getProjectIssues(state.value)),
  );

const authJira = (payload: JiraAuthModel) => Jira
  .auth(payload)
  .then(response => authJiraSuccess(response))
  .catch(error => authJiraError(error));

export const authJiraEpic = (action: ActionsObservable<AuthJiraAction>) => action
  .pipe(
    ofType(JIRA_ACTIONS.AUTH_JIRA),
    pluck('payload'),
    switchMap(authJira),
  );

const saveJiraUser = (payload: JiraAuthModel) => Storage
  .multiSet([ 'userJiraSpaceName', 'userJiraEmail', 'userJiraToken' ], R.values(payload))
  .then(() => getJiraConfiguration())
  .catch(R.identity);

export const authJiraSuccessEpic = (action: ActionsObservable<JiraActions>, state: { value: AppState }) => action
  .pipe(
    ofType(JIRA_ACTIONS.AUTH_JIRA_SUCCESS),
    switchMap(() => saveJiraUser(R.pathOr({}, [ 'value', 'jira', 'auth' ], state))),
  );

const initializeJira = () => Storage
  .multiGet([ 'userJiraSpaceName', 'userJiraEmail', 'userJiraToken' ])
  .then(response => (isPresent(response) && response)
    ? authJiraAction(parseJiraAuthData(response))
    : authJiraError())
  .catch(error => authJiraError(error));

export const initializeJiraEpic = (action: ActionsObservable<JiraActions>) => action
  .pipe(
    ofType(JIRA_ACTIONS.INITIALIZE),
    switchMap(initializeJira),
  );

const jiraSignOut = () => Storage
  .multiDelete([ 'userJiraSpaceName', 'userJiraEmail', 'userJiraToken' ])
  .then(() => jiraSignOutSuccess())
  .catch(error => jiraSignOutError(error));

export const jiraSignOutEpic = (action: ActionsObservable<JiraActions>) => action
  .pipe(
    ofType(JIRA_ACTIONS.SIGN_OUT),
    switchMap(jiraSignOut),
  );

const setJiraConfiguration = (payload: JiraConfigurationModel) => Storage
  .set('jiraCustomField', payload.customField)
  .then(() => setJiraConfigurationSuccess(payload))
  .catch(error => setJiraConfigurationError(error));

export const setJiraConfigurationEpic = (action: ActionsObservable<SetJiraConfigurationAction>) => action
  .pipe(
    ofType(JIRA_ACTIONS.SET_JIRA_CONFIGURATION),
    pluck('payload'),
    switchMap(setJiraConfiguration),
  );

const getJiraConfiguration = () => Storage
  .multiGet([ 'jiraCustomField' ])
  .then(response => getJiraConfigurationSuccess(parseJiraConfigurationData(response)))
  .catch(error => getJiraConfigurationError(error));

export const getJiraConfigurationEpic = (action: ActionsObservable<JiraActions>) => action
  .pipe(
    ofType(JIRA_ACTIONS.GET_JIRA_CONFIGURATION),
    switchMap(getJiraConfiguration),
  );
