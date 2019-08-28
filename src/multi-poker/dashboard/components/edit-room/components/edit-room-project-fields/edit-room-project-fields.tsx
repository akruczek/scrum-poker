import * as React from 'react';
import { View } from 'react-native';
import { Container, Box } from '@core/styled';
import { CustomInput, LinkButton } from '@core/components';
import { TRANSLATIONS } from '@core/models';

interface Props {
  name: string;
  projectKey: string;
  handleChange: (prop: 'name' | 'projectKey', value: string) => void;
  chooseProject: (value: boolean) => void;
}

export const EditRoomProjectFields = ({ name, projectKey, handleChange, chooseProject }: Props) => (
  <View>
    <Container flexDirection="row">
      <CustomInput
          handleChange={(value: string) => handleChange('name', value)}
          label={TRANSLATIONS.PROJECT_NAME}
          value={name}
          placeholder={TRANSLATIONS.PLACEHOLDER_NAME}
          centered
      />
      <CustomInput
          handleChange={(value: string) => handleChange('projectKey', value)}
          label={TRANSLATIONS.PROJECT_KEY}
          value={projectKey}
          placeholder={TRANSLATIONS.PLACEHOLDER_KEY}
          centered
      />
    </Container>
    <Box top={5}>
      <LinkButton handlePress={() => chooseProject(true)} title={TRANSLATIONS.SELECT_PROJECT_} />
    </Box>
  </View>
);
