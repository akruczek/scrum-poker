import * as React from 'react';
import { JiraIssueModel } from '@core/models';
import { filterIssues } from '../../helpers';

type ReturnType = [
  (value: boolean) => void,
  (value: boolean) => void,
  (issues: JiraIssueModel[]) => JiraIssueModel[],
];

export const useFilterIssues = (
  defaultIssueType: string,
  defaultIssueStatus: string,
): ReturnType => {
  const [ onlyType, setOnlyType ] = React.useState(true);
  const [ onlyStatus, setOnlyStatus ] = React.useState(true);

  const filteredIssues = filterIssues(onlyType, onlyStatus, defaultIssueType, defaultIssueStatus)

  return [ setOnlyStatus, setOnlyType, filteredIssues ];
};
