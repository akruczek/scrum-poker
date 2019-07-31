import * as React from 'react';
import { Modal } from 'react-native';
import { CardButton } from '@core/components';
import { PokerCard } from '@core/models';

interface Props {
  card: PokerCard;
  handleBackPress: () => void;
}

export const FullScreenCard = (props: Props) => {
  return (
    <Modal animationType="slide">
      <CardButton card={props.card} handleSelect={props.handleBackPress} fullScreen />
    </Modal>
  );
};
