import * as React from 'react';
import * as R from 'ramda';
import { Text } from '@core/styled';
import { TEXT_SIZES, COLORS } from '@core/constants';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';

export const SpaceNameTooltip = () => {
  const spaceName = R.toLower(R.replace(/ /, '_', translate(TRANSLATIONS.SPACE_NAME)));

  return (
    <Text>
      <Text size={TEXT_SIZES.SMALL} color={COLORS.RED_CARD} children={spaceName} />
      <Text size={TEXT_SIZES.SMALL} children=".atlassian.net" />
    </Text>
  );
};
