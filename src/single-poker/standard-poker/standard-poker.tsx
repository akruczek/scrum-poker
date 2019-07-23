import React from 'react';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { Container } from '../../core/styled/container/container.styled';
import { PokerCard, CARD_COLORS } from '../models/poker-card.models';
import { Button, Icon } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { SCREENS } from '../../core/navigation/screens';
import { FullScreenCard } from '../full-screen-card/full-screen-card';
import { getCardColorStyle, getCardTitleStyle } from '../helpers/get-card-style.helpers';
import { CARDS, CARDS_STACK } from '../../core/constants/cards';

interface State {
  selectedCard: PokerCard | null;
}

export class StandardPoker extends React.Component<NavigationProps, State> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      selectedCard: null,
    };
  }

  static navigationOptions = (props: NavigationProps) => ({
    title: 'Standard Poker',
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.navigate(SCREENS.SINGLE_PLAYER)}>
        <Icon name="arrow-back" />
      </TouchableOpacity>
    ),
  });

  public cards: PokerCard[] = CARDS_STACK[CARDS.STANDARD_POKER];

  private handleSelect(card?: PokerCard) {
    this.setState({ selectedCard: card || null });
  }

  private getButtonStyle = (value: any) => ({
    width: 80,
    height: 120,
    margin: 10,
    ...getCardColorStyle(value),
  });

  private getButtonTitleStyle = (value: any) => ({
    fontSize: 30,
    ...getCardTitleStyle(value),
  });

  render() {
    const { selectedCard } = this.state;

    return (
      <AppContainer>
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <Container margins="25px 0 0" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
            {this.cards.map((card: PokerCard) => (
              <View key={card.label} style={{ marginBottom: 10 }}>
                <Button
                    title={card.label}
                    onPress={() => this.handleSelect(card)}
                    buttonStyle={this.getButtonStyle(card.value)}
                    titleStyle={this.getButtonTitleStyle(card.value)}
                    raised
                />
              </View>
            ))}
          </Container>
        </ScrollContainer>

        {selectedCard && (
          <FullScreenCard card={selectedCard} handleBackPress={() => this.handleSelect()} />
        )}
      </AppContainer>
    );
  }
}
