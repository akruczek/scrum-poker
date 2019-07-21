import * as React from 'react';
import { Modal, View } from 'react-native';
import { Container } from '../../../../core/styled/container/container.styled';
import { CARDS, CARDS_STACK } from '../../../../core/constants/cards';
import { PokerCard } from '../../../../single-poker/models/poker-card.models';
import { Button } from 'react-native-elements';
import { getCardColorStyle, getCardTitleStyle } from '../../../../single-poker/helpers/get-card-style.helpers';
import { ScrollContainer } from '../../../../core/styled/scroll-container/scroll-container.styled';

interface Props {
  handleSelect: (card: PokerCard) => void;
}

export const SelectCard = (props: Props) => {
  const getButtonStyle = (value: any) => ({
    width: 80,
    height: 120,
    margin: 10,
    ...getCardColorStyle(value),
  });

  const getButtonTitleStyle = (value: any) => ({
    fontSize: 30,
    ...getCardTitleStyle(value),
  });

  return (
    <Modal animationType="slide">
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Container margins="25px 0 0" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
          {CARDS_STACK[CARDS.STANDARD_POKER].map((card: PokerCard) => (
            <View key={card.label} style={{ marginBottom: 10 }}>
              <Button
                  title={card.label}
                  onPress={() => props.handleSelect(card)}
                  buttonStyle={getButtonStyle(card.value)}
                  titleStyle={getButtonTitleStyle(card.value)}
                  raised
              />
            </View>
          ))}
        </Container>
      </ScrollContainer>
    </Modal>
  );
};

