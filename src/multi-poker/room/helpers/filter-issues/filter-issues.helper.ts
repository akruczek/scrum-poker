import * as R from 'ramda';
import { JiraIssueModel } from '@core/models';
import { isPresent } from '@core/helpers';

export const filterIssues = (
  onlyType: boolean,
  onlyStatus: boolean,
  defaultIssueType: string,
  defaultIssueStatus: string,
) => R.pipe<JiraIssueModel[], JiraIssueModel[], JiraIssueModel[]>(
  R.when<JiraIssueModel[], JiraIssueModel[]>(
    () => !!(onlyType && isPresent(defaultIssueType)),
    R.filter(R.propEq('issueType', defaultIssueType)),
  ),
  R.when<JiraIssueModel[], JiraIssueModel[]>(
    () => !!(onlyStatus && isPresent(defaultIssueStatus)),
    R.filter(R.propEq('status', defaultIssueStatus)),
  ),
);
