import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { SetIssueStoryPointsPayload, JIRA_BD_CUSTOM_FIELDS } from '../../../models';
import { Jira } from '../jira.service';
import {
  JIRA_ACTIONS,
  setIssueStoryPointsSuccess, SetIssueStoryPointsAction, setIssueStoryPointsError,
  GetIssueAction, getIssueSuccess, getIssueError,
} from './jira.actions';

const setIssueStoryPoints = ({ issueKey, value }: SetIssueStoryPointsPayload) => Jira
  .put
  .issue(issueKey)
  .property(JIRA_BD_CUSTOM_FIELDS.STORY_POINTS)
  .set(value)
  .then(() => setIssueStoryPointsSuccess())
  .catch(error => setIssueStoryPointsError(error));

export const setIssueStoryPointsEpic = (action: ActionsObservable<SetIssueStoryPointsAction>) => action
  .pipe(
    ofType(JIRA_ACTIONS.SET_ISSUE_STORY_POINTS),
    pluck('payload'),
    switchMap(setIssueStoryPoints),
  );

const getIssue = (issueKey: string) => Jira
  .get
  .issue(issueKey)
  .then(response => getIssueSuccess(response))
  .catch(error => getIssueError(error));

export const getIssueEpic = (action: ActionsObservable<GetIssueAction>) => action
  .pipe(
    ofType(JIRA_ACTIONS.GET_ISSUE),
    pluck('payload'),
    switchMap(getIssue),
  );
