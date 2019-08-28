import * as React from 'react';
import { Text, Separator } from '@core/styled';
import { TRANSLATIONS } from '@core/models';
import { TEXT_SIZES } from '@core/constants';
import { translate } from '@core/services/translations/translate';

export const JiraPusherHeader = () => (
  <>
    <Text size={TEXT_SIZES.BIG} align="center">
      {translate(TRANSLATIONS.PUSH_TO_JIRA)}
    </Text>
    <Separator margin={10} />
  </>
);
