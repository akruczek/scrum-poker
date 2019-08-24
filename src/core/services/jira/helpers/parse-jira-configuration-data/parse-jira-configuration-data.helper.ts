import * as R from 'ramda';

export const parseJiraConfigurationData = R.pipe<any, any, any, any>(
  R.fromPairs,
  R.values,
  R.zipObj([ 'customField', 'defaultIssueType', 'defaultIssueStatus' ]),
);
