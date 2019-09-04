import * as React from 'react';
import { Button, colors } from 'react-native-elements';
import { ifElse } from '@core/helpers';
import { Box } from '@core/styled';
import { COLORS, defaultFont } from '@core/constants';
import { TRANSLATIONS } from '@core/models';
import { translate } from '@core/services/translations/translate';

interface Props {
  isCreating: boolean;
  setResetUsers: (value: boolean) => void;
}

export const ResetUsers = ({ isCreating, setResetUsers }: Props) => ifElse(
  isCreating,
  null,
  <Box top={10}>
    <Button
        title={translate(TRANSLATIONS.RESET_USERS)}
        buttonStyle={{ backgroundColor: colors.secondary }}
        titleStyle={{ fontFamily: defaultFont }}
        onPress={() => setResetUsers(true)}
        icon={{ name: 'delete', color: COLORS.WHITE }}
    />
  </Box>
);
