import * as React from 'react';
import { Button, colors } from 'react-native-elements';
import { Separator, Container } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';

interface Props {
  handleShowDown: () => void;
  handleReset: () => void;
}

export const RoomButtonsSet = (props: Props) => (
  <Container margins="0 10px" justifyContent="flex-end">
    <Button title={translate(TRANSLATIONS.SHOW_DOWN)} onPress={props.handleShowDown} />
    <Separator margin={10} />
    <Button title={translate(TRANSLATIONS.RESET)} buttonStyle={{ backgroundColor: colors.secondary }} onPress={props.handleReset} />
  </Container>
);
