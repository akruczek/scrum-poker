import * as React from 'react';
import { Button, colors } from 'react-native-elements';
import { Separator } from '../../../../core/styled/separator/separator';
import { Container } from '../../../../core/styled/container/container.styled';

interface Props {
  handleShowDown: () => void;
  handleReset: () => void;
}

export const RoomButtonsSet = (props: Props) => (
  <Container margins="0 10px" justifyContent="flex-end">
    <Button title="SHOW DOWN" onPress={props.handleShowDown} />
    <Separator margin={10} />
    <Button title="RESET" buttonStyle={{ backgroundColor: colors.secondary }} onPress={props.handleReset} />
  </Container>
);
