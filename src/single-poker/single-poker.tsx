import React from 'react';
import { ScrollContainer } from '../core/styled/scroll-container/scroll-container.styled';
import { AppContainer } from '../core/styled/app-container/app-container';
import { NavigationProps } from '../core/navigation/navigation.model';
import { Container } from '../core/styled/container/container.styled';
import { CARDS, CARDS_STACK } from '../core/constants/cards';
import { HeaderBackButton } from '../core/components/header-back-button/header-back-button';
import { SCREENS } from '../core/navigation/screens';
import { CardButton } from '../core/components/card-button/card-button';
import { PokerCard } from '../core/models/poker-card.models';
import { FullScreenCard } from './full-screen-card/full-screen-card';
import { ViewContainer } from '../core/styled/view-container/view-container';

const _SinglePoker = ({ navigation }: NavigationProps) => {
  const [ selectedCard, handleSelect ] = React.useState();

  const cardsStack: CARDS = navigation.getParam('cards');
  const cards: PokerCard[] = CARDS_STACK[cardsStack];

  return (
    <AppContainer>
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Container margins="25px 0 0" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
          {cards.map((card: PokerCard) => (
            <ViewContainer key={card.label} margins="0 0 10px">
              <CardButton card={card} handleSelect={handleSelect} />
            </ViewContainer>
          ))}
        </Container>
      </ScrollContainer>

      {selectedCard && (
        <FullScreenCard card={selectedCard} handleBackPress={() => handleSelect(null)} />
      )}
    </AppContainer>
  );
};

_SinglePoker.navigationOptions = ({ navigation }: NavigationProps) => ({
  title: navigation.getParam('title'),
  headerLeft: <HeaderBackButton navigation={navigation} screen={SCREENS.SINGLE_PLAYER} />,
});

export const SinglePoker = _SinglePoker;
