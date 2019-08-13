import * as React from 'react';
import { Linking } from 'react-native';
import { Link, Text } from '@core/styled';
import { COLORS, TEXT_SIZES } from '@core/constants';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';

export const TokenTooltip = () => (
  <Link onPress={() => Linking.openURL('https://confluence.atlassian.com/cloud/api-tokens-938839638.html')}>
    <Text decorationLine="underline" color={COLORS.WHITE} size={TEXT_SIZES.SMALL}>
      {translate(TRANSLATIONS.GENERATE_JIRA_TOKEN_HELP)}
    </Text>
  </Link>
);
