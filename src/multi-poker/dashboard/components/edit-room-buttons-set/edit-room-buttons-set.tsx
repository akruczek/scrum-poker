import * as React from 'react';
import { View } from 'react-native';
import { Button, colors } from 'react-native-elements';
import { Separator } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';
import { COLORS } from '@core/constants';
import { EDIT_ROOMS_TYPES } from '../../../models/room.models';

interface Props {
  handleSubmit: () => void;
  handleDismiss: () => void;
  type: EDIT_ROOMS_TYPES;
}

export const EditRoomButtonsSet = ({ handleSubmit, handleDismiss, type }: Props) => {
  const isCreating = type === EDIT_ROOMS_TYPES.CREATE

  return (
    <View style={{ backgroundColor: COLORS.WHITE }}>
      <Button
          title={translate(TRANSLATIONS[isCreating ? 'CREATE' : 'UPDATE'])}
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
