import * as React from 'react';
import { Modal, View } from 'react-native';
import { Container, ScrollContainer } from '@core/styled';
import { CARDS, CARDS_STACK } from '@core/constants';
import { CardButton } from '@core/components';
import { PokerCard } from '@core/models';

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

