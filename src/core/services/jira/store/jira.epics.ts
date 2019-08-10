import * as R from 'ramda';
import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { SetIssueStoryPointsPayload, JIRA_BD_CUSTOM_FIELDS, JiraAuthModel } from '../../../models';
import { Jira } from '../jira.service';
import { getJiraAuthResponse } from '../helpers/get-jira-auth-response/get-jira-auth-response.helper';
import { AppState } from '../../../../store/reducers';
import {
  JIRA_ACTIONS,
  setIssueStoryPointsSuccess, SetIssueStoryPointsAction, setIssueStoryPointsError,
  GetIssueAction, getIssueSuccess, getIssueError, AuthJiraAction, authJiraSuccess, authJiraError,
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
