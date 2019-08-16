import * as R from 'ramda';
import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { SetIssueStoryPointsPayload, JIRA_BD_CUSTOM_FIELDS, JiraAuthModel } from '../../../models';
import { Jira } from '../jira.service';
import { AppState } from '../../../../store/reducers';
import { Storage } from '../../device-storage/device-storage.service';
import { EMPTY_ACTION } from '../../../constants';
import { parseJiraAuthData } from '../helpers/parse-jira-auth-data/parse-jira-auth-data.helper';
import { isPresent } from '../../../helpers';
import {
  JIRA_ACTIONS,
  setIssueStoryPointsSuccess, SetIssueStoryPointsAction, setIssueStoryPointsError, authJira as authJiraAction,
  GetIssueAction, getIssueSuccess, getIssueError, AuthJiraAction, authJiraSuccess, authJiraError, JiraActions,
  jiraSignOutSuccess, jiraSignOutError,
} from './jira.actions';

const setIssueStoryPoints = ({ issueKey, value }: SetIssueStoryPointsPayload, state: AppState) => Jira
  .put(R.pathOr({}, [ 'jira', 'auth' ], state))
  .issue(issueKey)
  .property(JIRA_BD_CUSTOM_FIELDS.STORY_POINTS)
  .set(value)
  .then(() => setIssueStoryPointsSuccess())
  .catch((error: any) => setIssueStoryPointsError(error));

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
  .then(() => EMPTY_ACTION)
  .catch(R.identity);

export const authJiraSuccessEpic = (action: ActionsObservable<JiraActions>, state: { value: AppState }) => action
  .pipe(
    ofType(JIRA_ACTIONS.AUTH_JIRA_SUCCESS),
    switchMap(() => saveJiraUser(R.pathOr({}, [ 'value', 'jira', 'auth' ], state))),
  );

const initializeJira = () => Storage
  .multiGet([ 'userJiraSpaceName', 'userJiraEmail', 'userJiraToken' ])
  .then(response => isPresent(response) ? authJiraAction(parseJiraAuthData(response)) : authJiraError())
  .catch(error => error);

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
  )
