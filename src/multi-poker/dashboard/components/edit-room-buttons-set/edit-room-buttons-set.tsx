import * as React from 'react';
import { View } from 'react-native';
import { Button, colors } from 'react-native-elements';
import { Separator } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';
import { COLORS } from '@core/constants';

interface Props {
  handleSubmit: () => void;
  handleDismiss: () => void;
}

export const EditRoomButtonsSet = ({ handleSubmit, handleDismiss }: Props) => {
  return (
    <View style={{ backgroundColor: COLORS.WHITE }}>
      <Button
          title={translate(TRANSLATIONS.CREATE)}
          onPress={handleSubmit}
      />

      <Separator margin={10} />

      <Button
          title={translate(TRANSLATIONS.DISMISS)}
          onPress={handleDismiss}
          buttonStyle={{ backgroundColor: colors.secondary }}
      />
    </View>
  );
};
