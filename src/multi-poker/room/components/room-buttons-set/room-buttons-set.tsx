import * as React from 'react';
import { Button, colors } from 'react-native-elements';
import { Separator } from '../../../../core/styled/separator/separator';

interface Props {
  handleShowDown: () => void;
  handleReset: () => void;
}

export const RoomButtonsSet = (props: Props) => {
  return (
    <>
      <Button title="SHOW DOWN" onPress={props.handleShowDown} />
      <Separator margin={10} />
      <Button title="RESET" buttonStyle={{ backgroundColor: colors.secondary }} onPress={props.handleReset} />
    </>
  );
};
