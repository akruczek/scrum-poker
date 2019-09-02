import * as React from 'react';
import * as R from 'ramda';
import { JiraConfigurationModel } from '@core/models';

interface Fields {
  customField: string;
  defaultIssueType: string;
  defaultIssueStatus: string;
}

interface Setters {
  setCustomField: (customField: string) => void,
  setDefaultIssueType: (defaultIssueType: string) => void,
  setDefaultIssueStatus: (defaultIssueStatus: string) => void,
}

type ReturnType = [
  Fields, Setters, () => void,
];

export const useSetJiraConfiguration = (
  jiraConfiguration: JiraConfigurationModel,
  setJiraConfiguration: (jiraConfiguration: JiraConfigurationModel) => void,
): ReturnType => {
  const [ customField, setCustomField ] = React.useState('');
  const [ defaultIssueType, setDefaultIssueType ] = React.useState('')
  const [ defaultIssueStatus, setDefaultIssueStatus ] = React.useState('');

  React.useEffect(() => {
    setCustomField(R.propOr('', 'customField', jiraConfiguration));
    setDefaultIssueType(R.propOr('', 'defaultIssueType', jiraConfiguration));
    setDefaultIssueStatus(R.propOr('', 'defaultIssueStatus', jiraConfiguration));
  }, []);

  const handleApply = () => {
    if (customField) {
      setJiraConfiguration({ customField, defaultIssueType, defaultIssueStatus });
    }
  };

  const fields = {
    customField, defaultIssueType, defaultIssueStatus,
  };

  const setters = {
    setCustomField, setDefaultIssueType, setDefaultIssueStatus,
  };

  return [ fields, setters, handleApply ];
};
