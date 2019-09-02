import * as React from 'react';
import { Text } from '@core/styled';
import { TEXT_SIZES } from '@core/constants';
import { TRANSLATIONS } from '@core/models';
import { translate } from '@core/services/translations/translate';

export const JiraConfigHeader = () => (
  <Text size={TEXT_SIZES.BIG} margins="10px 0 0" align="center">
    {translate(TRANSLATIONS.JIRA_CONFIGURATION)}
  </Text>
);
