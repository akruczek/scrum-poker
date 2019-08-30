import * as React from 'react';
import { View } from 'react-native';
import { Button, colors } from 'react-native-elements';
import { COLORS } from '@core/constants';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';

interface Props {
  handleClose: () => void;
}

export const IssuesListButtonsSet = ({ handleClose }: Props) => (
  <View style={{ backgroundColor: COLORS.WHITE, paddingTop: 5 }}>
    <Button
        buttonStyle={{ backgroundColor: colors.secondary }}
        onPress={() => handleClose()}
        title={translate(TRANSLATIONS.DISMISS)}
    />
  </View>
);
