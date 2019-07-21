import React from 'react';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { PokerCard } from '../models/poker-card.models';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { SCREENS } from '../../core/navigation/screens';
import { StandardPoker } from '../standard-poker/standard-poker';
import { CARDS_STACK, CARDS } from '../../core/constants/cards';

export class RiskPoker extends StandardPoker {
  static navigationOptions = (props: NavigationProps) => ({
    title: 'Risk Poker',
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.navigate(SCREENS.SINGLE_PLAYER)}>
        <Icon name="arrow-back" />
      </TouchableOpacity>
    ),
  });

  public cards: PokerCard[] = CARDS_STACK[CARDS.RISK_POKER];
}
