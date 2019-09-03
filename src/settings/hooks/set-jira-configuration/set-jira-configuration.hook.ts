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
  boolean, boolean, Fields, Setters, () => void,
];

export const useSetJiraConfiguration = (
  jiraConfiguration: JiraConfigurationModel,
  setJiraConfiguration: (jiraConfiguration: JiraConfigurationModel) => void,
  handleClose: () => void,
): ReturnType => {
  const [ isSuccess, setSuccess ] = React.useState(false);
  const [ isDirty, setDirty ] = React.useState(false);
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
      setDirty(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 1500);
    }
  };

  const fields = {
    customField, defaultIssueType, defaultIssueStatus,
  };

  const handleChange = (method: (value: string) => void) => (value: string) =>  {
    setDirty(true);
    method(value);
  }

  const setters = {
    setCustomField: handleChange(setCustomField),
    setDefaultIssueType: handleChange(setDefaultIssueType),
    setDefaultIssueStatus: handleChange(setDefaultIssueStatus),
  };

  return [ isSuccess, isDirty, fields, setters, handleApply ];
};
