import * as React from 'react';
import { Modal, View } from 'react-native';
import { Container, ScrollContainer } from '@core/styled';
import { CARDS, CARDS_STACK } from '@core/constants';
import { CardButton } from '@core/components';
import { PokerCard } from '@core/models';

interface Props {
  handleSelect: (card: PokerCard) => void;
  cards: CARDS;
}

export const SelectCard = ({ cards, handleSelect }: Props) => {
  const pokerCards: PokerCard[] = CARDS_STACK[cards || CARDS.STANDARD_POKER];

  return (
    <Modal animationType="slide">
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Container margins="35px 0 0" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
          {pokerCards.map((card: PokerCard) => (
            <View key={card.label} style={{ marginBottom: 10 }}>
              <CardButton card={card} handleSelect={handleSelect} />
            </View>
          ))}
        </Container>
      </ScrollContainer>
    </Modal>
  );
};

