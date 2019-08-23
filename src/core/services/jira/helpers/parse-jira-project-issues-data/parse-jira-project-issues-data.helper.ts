import * as R from 'ramda';
import { JiraIssueModel } from '../../../../models';

export const parseJiraProjectIssues = R.map<any, JiraIssueModel[]>(
  ({ id, key, fields }: any) => ({
    id, key,
    createdAt: fields.created,
    summary: fields.summary,
  }),
);
