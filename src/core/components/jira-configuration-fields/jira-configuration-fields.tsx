import * as React from 'react';
import { Separator } from '../../styled';
import { TRANSLATIONS } from '../../models';
import { CustomInput } from '../custom-input/custom-input';

interface Props {
  customField: string;
  setCustomField: (customField: string) => void;
  defaultIssueType: string;
  setDefaultIssueType: (defaultIssueType: string) => void;
  defaultIssueStatus: string;
  setDefaultIssueStatus: (defaultIssueStatus: string) => void;
}

export const JiraConfigurationFields = ({
  customField, setCustomField,
  defaultIssueType, setDefaultIssueType,
  defaultIssueStatus, setDefaultIssueStatus,
}: Props) => (
  <>
    <CustomInput
        handleChange={setCustomField}
        label={TRANSLATIONS.CUSTOM_FIELD}
        value={customField}
        placeholder={TRANSLATIONS.CUSTOM_FIELD_PLACEHOLDER}
        centered
    />

    <Separator margin={10} />
    <CustomInput
        handleChange={setDefaultIssueType}
        label={TRANSLATIONS.DEFAULT_ISSUE_TYPE}
        value={defaultIssueType}
        placeholder={TRANSLATIONS.DEFAULT_ISSUE_TYPE_PLACEHOLDER}
        centered
    />
    <Separator margin={10} />

    <CustomInput
        handleChange={setDefaultIssueStatus}
        label={TRANSLATIONS.DEFAULT_ISSUE_STATUS}
        value={defaultIssueStatus}
        placeholder={TRANSLATIONS.DEFAULT_ISSUE_STATUS_PLACEHOLDER}
        centered
    />
  </>
);
