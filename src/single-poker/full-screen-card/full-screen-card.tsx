import * as React from 'react';
import { Button } from 'react-native-elements';
import { Modal } from 'react-native';
import layout from '../../core/constants/layout';
import { PokerCard } from '../models/poker-card.models';
import { getCardColorStyle, getCardTitleStyle } from '../helpers/get-card-style.helpers';

interface Props {
  card: PokerCard
  handleBackPress: () => void;
}

export const FullScreenCard = (props: Props) => {
  const buttonStyle = {
    width: layout.window.width,
    height: layout.window.height,
    ...getCardColorStyle(props.card.value),
  };

  const buttonTitleStyle = {
    fontSize: 160,
    ...getCardTitleStyle(props.card.value),
  };

  return (
    <Modal animationType="slide">
      <Button
          buttonStyle={buttonStyle}
          titleStyle={buttonTitleStyle}
          title={props.card.label}
          onPress={props.handleBackPress}
      />
    </Modal>
  );
};
