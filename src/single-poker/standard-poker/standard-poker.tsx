import React from 'react';
import * as R from 'ramda';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { Container } from '../../core/styled/container/container.styled';
import { PokerCard, CARD_COLORS } from '../models/poker-card.models';
import { Button, Icon } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { SCREENS } from '../../core/navigation/screens';
import { FullScreenCard } from '../full-screen-card/full-screen-card';
import { colors } from '../../core/constants/colors';
import { isRiskCard } from '../helpers/is-risk-card.helper';
import { getCardColorStyle, getCardTitleStyle } from '../helpers/get-card-style.helpers';

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

  public cards: PokerCard[] = [
    { value: 0, label: '0' },
    { value: 0.5, label: '½' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 8, label: '8' },
    { value: 13, label: '13' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 100, label: '100' },
    { value: Infinity, label: '∞' },
    { value: undefined, label: '?' },
  ];

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

        {this.state.selectedCard && (
          <FullScreenCard
              card={this.state.selectedCard}
              handleBackPress={() => this.handleSelect()}
          />
        )}
      </AppContainer>
    );
  }
}
