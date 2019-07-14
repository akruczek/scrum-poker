import React from 'react';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { PokerCard } from '../models/poker-card.models';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { SCREENS } from '../../core/navigation/screens';
import { StandardPoker } from '../standard-poker/standard-poker';

export class FibonacciPoker extends StandardPoker {
  static navigationOptions = (props: NavigationProps) => ({
    title: 'Fibonacci Poker',
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.navigate(SCREENS.SINGLE_PLAYER)}>
        <Icon name="arrow-back" />
      </TouchableOpacity>
    ),
  });

  public cards: PokerCard[] = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 8, label: '8' },
    { value: 13, label: '13' },
    { value: 21, label: '21' },
    { value: 34, label: '34' },
    { value: 55, label: '55' },
    { value: 89, label: '89' },
    { value: 144, label: '144' },
    { value: Infinity, label: '∞' },
    { value: undefined, label: '?' },
  ];
}
