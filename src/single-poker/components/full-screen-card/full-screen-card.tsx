import * as React from 'react';
import { Modal } from 'react-native';
import { CardButton } from '@core/components';
import { PokerCard } from '@core/models';

interface Props {
  card: PokerCard;
  handleBackPress: () => void;
}

export const FullScreenCard = ({ card, handleBackPress }: Props) => (
  <Modal animationType="slide">
    <CardButton card={card} handleSelect={handleBackPress} fullScreen />
  </Modal>
);
