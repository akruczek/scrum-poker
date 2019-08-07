import * as React from 'react';
import { Button, colors } from 'react-native-elements';
import { Separator, Container } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';

interface Props {
  handleShowDown: () => void;
  handleReset: () => void;
  handlePushToJira: () => void;
  isDiscovered?: boolean;
}

export const RoomButtonsSet = ({ isDiscovered, handleShowDown, handleReset, handlePushToJira }: Props) => (
  <Container margins="0 10px" justifyContent="flex-end">
    <Button
        title={translate(TRANSLATIONS[isDiscovered ? 'PUSH_TO_JIRA' : 'SHOW_DOWN'])}
        onPress={isDiscovered ? handlePushToJira : handleShowDown}
    />

    <Separator margin={10} />

    <Button
        disabled={!isDiscovered}
        title={translate(TRANSLATIONS.RESET)}
        buttonStyle={{ backgroundColor: colors.secondary }}
        onPress={handleReset}
    />
  </Container>
);
