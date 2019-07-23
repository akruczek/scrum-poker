import React from 'react';
import { ScrollContainer } from '../core/styled/scroll-container/scroll-container.styled';
import { AppContainer } from '../core/styled/app-container/app-container';
import { NavigationProps } from '../core/navigation/navigation.model';
import { Container } from '../core/styled/container/container.styled';
import { View } from 'react-native';
import { CARDS, CARDS_STACK } from '../core/constants/cards';
import { HeaderBackButton } from '../core/components/header-back-button/header-back-button';
import { SCREENS } from '../core/navigation/screens';
import { CardButton } from '../core/components/card-button/card-button';
import { PokerCard } from '../core/models/poker-card.models';
import { FullScreenCard } from './full-screen-card/full-screen-card';

interface State {
  selectedCard: PokerCard | null;
}

export class SinglePoker extends React.Component<NavigationProps, State> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      selectedCard: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  static navigationOptions = (props: NavigationProps) => ({
    title: props.navigation.getParam('title'),
    headerLeft: <HeaderBackButton navigation={props.navigation} screen={SCREENS.SINGLE_PLAYER} />,
  });

  private cardsStack: CARDS = this.props.navigation.getParam('cards');
  public cards: PokerCard[] = CARDS_STACK[this.cardsStack];

  private handleSelect(card?: PokerCard) {
    this.setState({ selectedCard: card || null });
  }

  render() {
    const { selectedCard } = this.state;

    return (
      <AppContainer>
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <Container margins="25px 0 0" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
            {this.cards.map((card: PokerCard) => (
              <View key={card.label} style={{ marginBottom: 10 }}>
                <CardButton card={card} handleSelect={this.handleSelect} />
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
