import * as React from 'react';
import * as R from 'ramda';
import { JiraConfigurationModel, RoomModel } from '@core/models';

export const useGetJiraConfiguration = (
  room: RoomModel | undefined,
  jiraConfiguration: JiraConfigurationModel | undefined,
) => {
  const getDefaultConfig = (prop: string) => R.propOr(R.propOr('', prop, jiraConfiguration), prop, room) as any;
  const [ customField, setCustomField ] = React.useState(getDefaultConfig('customField'));
  const [ defaultIssueType, setDefaultIssueType ] = React.useState(getDefaultConfig('defaultIssueType'));
  const [ defaultIssueStatus, setDefaultIssueStatus ] = React.useState(getDefaultConfig('defaultIssueStatus'));

  return [
    customField, setCustomField,
    defaultIssueType, setDefaultIssueType,
    defaultIssueStatus, setDefaultIssueStatus,
  ];
};
