import * as React from 'react';
import { Checkbox } from '@core/components/checkbox-button/checkbox-button';
import { TRANSLATIONS } from '@core/models';
import { JiraConfigurationFields } from '@core/components/jira-configuration-fields/jira-configuration-fields';
import { Separator } from '@core/styled';

interface Props {
  customField: string;
  setCustomField: (customField: string) => void;
  defaultIssueType: string;
  setDefaultIssueType: (defaultIssueType: string) => void;
  defaultIssueStatus: string;
  setDefaultIssueStatus: (defaultIssueStatus: string) => void;
  isCreating?: boolean;
}

export const JiraConfigurationForm = ({
  customField, defaultIssueType, defaultIssueStatus, isCreating,
  setCustomField, setDefaultIssueType, setDefaultIssueStatus,
}: Props) => {
  const [ isTheSame, setIsTheSame ] = React.useState(true);

  return (
    <>
      {isCreating && (
        <Checkbox title={TRANSLATIONS.USE_MY_JIRA_CONFIGURATION} onChange={setIsTheSame} defaultChecked />
      )}

      {(!isTheSame || !isCreating) && (
        <>
          {isCreating && <Separator margin={20} />}
          <JiraConfigurationFields {...{
              customField, defaultIssueType, defaultIssueStatus,
              setCustomField, setDefaultIssueType, setDefaultIssueStatus }}
          />
        </>
      )}
    </>
  );
};
