import * as React from 'react';
import { Separator, Container, Text } from '../../styled';
import { translate } from '../../services/translations/translate';
import { TRANSLATIONS } from '../../models';
import { TEXT_SIZES } from '../../constants';
import { Input } from 'react-native-elements';

interface Props {
  customField: string;
  setCustomField: (customField: string) => void;
  defaultIssueType: string;
  setDefaultIssueType: (defaultIssueType: string) => void;
  defaultIssueStatus: string;
  setDefaultIssueStatus: (defaultIssueStatus: string) => void;
}

export const JiraConfigurationFields = ({
  customField, setCustomField, defaultIssueType, setDefaultIssueType, defaultIssueStatus, setDefaultIssueStatus,
}: Props) => (
  <>
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
);
