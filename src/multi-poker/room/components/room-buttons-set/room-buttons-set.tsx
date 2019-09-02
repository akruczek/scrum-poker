import * as React from 'react';
import { Button, colors } from 'react-native-elements';
import { View } from 'react-native';
import { Separator } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { defaultFont } from '@core/constants';

interface Props {
  handleShowDown: () => void;
  handleReset: () => void;
  handlePushToJira: () => void;
  isDiscovered?: boolean;
}

export const RoomButtonsSet = ({ isDiscovered, handleShowDown, handleReset, handlePushToJira }: Props) => (
  <View style={{ marginRight: 10, marginLeft: 10 }}>
    <Button
        title={translate(TRANSLATIONS[isDiscovered ? 'PUSH_TO_JIRA' : 'SHOW_DOWN'])}
        onPress={isDiscovered ? handlePushToJira : handleShowDown}
        titleStyle={{ fontFamily: defaultFont }}
    />

    <Separator margin={10} />

    <Button
        disabled={!isDiscovered}
        title={translate(TRANSLATIONS.RESET)}
        buttonStyle={{ backgroundColor: colors.secondary }}
        titleStyle={{ fontFamily: defaultFont }}
        onPress={handleReset}
    />
  </View>
);
