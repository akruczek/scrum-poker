import * as React from 'react';
import { Button } from 'react-native-elements';
import { Modal } from 'react-native';
import layout from '../../core/constants/layout';
import { PokerCard } from '../models/poker-card.models';

interface Props {
  card: PokerCard
  handleBackPress: () => void;
}

export const FullScreenCard = (props: Props) => {
  const buttonStyle = {
    width: layout.window.width,
    height: layout.window.height,
  };

  return (
    <Modal animationType="slide">
      <Button
          buttonStyle={buttonStyle}
          titleStyle={{ fontSize: 160 }}
          title={props.card.label}
          onPress={props.handleBackPress}
      />
    </Modal>
  );
};
