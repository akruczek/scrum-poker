import * as React from 'react';
import { Input } from 'react-native-elements';
import { Separator, Text } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { TEXT_SIZES } from '@core/constants';

interface Props {
  issueKey: string;
  setIssueKey: (key: string) => void,
}

export const JiraIssueKeyField = ({ issueKey, setIssueKey }: Props) => (
  <>
    <Separator margin={10} />
    <Text margins="0 0 10px" children={translate(TRANSLATIONS.ISSUE_KEY)} />
    <Input
        value={issueKey}
        placeholder={translate(TRANSLATIONS.JIRA_ISSUE_KEY)}
        onChangeText={setIssueKey}
        inputStyle={{ textAlign: 'center', fontSize: TEXT_SIZES.BIG }}
    />
  </>
);
