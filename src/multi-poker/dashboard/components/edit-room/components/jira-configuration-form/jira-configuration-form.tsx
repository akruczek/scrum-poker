import * as React from 'react';
import { Checkbox } from '../../../../../../core/components/checkbox-button/checkbox-button';
import { TRANSLATIONS } from '../../../../../../core/models';
import { Container, Text, Separator } from '../../../../../../core/styled';
import { Input } from 'react-native-elements';
import { TEXT_SIZES } from '../../../../../../core/constants';
import { translate } from '../../../../../../core/services/translations/translate';

interface Props {
  customField: string;
  setCustomField: (customField: string) => void;
  defaultIssueType: string;
  setDefaultIssueType: (defaultIssueType: string) => void;
  defaultIssueStatus: string;
  setDefaultIssueStatus: (defaultIssueStatus: string) => void;
}

export const JiraConfigurationForm = ({
  customField, defaultIssueType, defaultIssueStatus,
  setCustomField, setDefaultIssueType, setDefaultIssueStatus,
}: Props) => {
  const [ isTheSame, setIsTheSame ] = React.useState(true);

  return (
    <>
      <Checkbox title={TRANSLATIONS.USE_MY_JIRA_CONFIGURATION} onChange={setIsTheSame} defaultChecked />

      {!isTheSame && (
        <>
          <Separator margin={20} />
          <Container alignItems="center">
            <Text size={TEXT_SIZES.SMALL} children={translate(TRANSLATIONS.CUSTOM_FIELD)} />
            <Input
                value={customField}
                placeholder={translate(TRANSLATIONS.CUSTOM_FIELD_PLACEHOLDER)}
                onChangeText={setCustomField}
                inputStyle={{ textAlign: 'center' }}
            />
          </Container>

          <Separator margin={10} />
          <Container alignItems="center">
            <Text size={TEXT_SIZES.SMALL} children={translate(TRANSLATIONS.DEFAULT_ISSUE_TYPE)} />
            <Input
                value={defaultIssueType}
                placeholder={translate(TRANSLATIONS.DEFAULT_ISSUE_TYPE_PLACEHOLDER)}
                onChangeText={setDefaultIssueType}
                inputStyle={{ textAlign: 'center' }}
            />
          </Container>
          <Separator margin={10} />

          <Container alignItems="center">
            <Text size={TEXT_SIZES.SMALL} children={translate(TRANSLATIONS.DEFAULT_ISSUE_STATUS)} />
            <Input
                value={defaultIssueStatus}
                placeholder={translate(TRANSLATIONS.DEFAULT_ISSUE_STATUS_PLACEHOLDER)}
                onChangeText={setDefaultIssueStatus}
                inputStyle={{ textAlign: 'center' }}
            />
          </Container>
        </>
      )}
    </>
  );
};
