import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { CARDS, CARDS_STACK } from '@core/constants';
import { PokerCard } from '@core/models';

type ReturnType = [
  PokerCard[],
  PokerCard,
  (card: PokerCard | null) => void,
];

export const useSelectCard = (
  navigation: NavigationScreenProp<any, any>,
): ReturnType => {
  const [ selectedCard, handleSelect ] = React.useState();

  const cardsStack: CARDS = navigation.getParam('cards');
  const cards: PokerCard[] = CARDS_STACK[cardsStack];

  return [ cards, selectedCard, handleSelect ];
};
