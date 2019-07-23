import * as React from 'react';
import { Modal, View } from 'react-native';
import { Container } from '../../../../core/styled/container/container.styled';
import { CARDS, CARDS_STACK } from '../../../../core/constants/cards';
import { ScrollContainer } from '../../../../core/styled/scroll-container/scroll-container.styled';
import { CardButton } from '../../../../core/components/card-button/card-button';
import { PokerCard } from '../../../../core/models/poker-card.models';

interface Props {
  handleSelect: (card: PokerCard) => void;
}

export const SelectCard = (props: Props) => {
  return (
    <Modal animationType="slide">
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Container margins="25px 0 0" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
          {CARDS_STACK[CARDS.STANDARD_POKER].map((card: PokerCard) => (
            <View key={card.label} style={{ marginBottom: 10 }}>
              <CardButton card={card} handleSelect={props.handleSelect} />
            </View>
          ))}
        </Container>
      </ScrollContainer>
    </Modal>
  );
};

