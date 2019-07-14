import React from 'react';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { PokerCard } from '../models/poker-card.models';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { SCREENS } from '../../core/navigation/screens';
import { StandardPoker } from '../standard-poker/standard-poker';

export class TShirtPoker extends StandardPoker {
  static navigationOptions = (props: NavigationProps) => ({
    title: 'T-Shirt Poker',
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.navigate(SCREENS.SINGLE_PLAYER)}>
        <Icon name="arrow-back" />
      </TouchableOpacity>
    ),
  });

  public cards: PokerCard[] = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XLL', label: 'XLL' },
    { value: Infinity, label: '∞' },
    { value: undefined, label: '?' },
  ];
}
