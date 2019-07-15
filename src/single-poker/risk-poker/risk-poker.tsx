import React from 'react';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { PokerCard } from '../models/poker-card.models';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { SCREENS } from '../../core/navigation/screens';
import { StandardPoker } from '../standard-poker/standard-poker';

export class RiskPoker extends StandardPoker {
  static navigationOptions = (props: NavigationProps) => ({
    title: 'Risk Poker',
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.navigate(SCREENS.SINGLE_PLAYER)}>
        <Icon name="arrow-back" />
      </TouchableOpacity>
    ),
  });

  public cards: PokerCard[] = [
    { value: 'risk-green', label: 'green' },
    { value: 'risk-yellow', label: 'yellow' },
    { value: 'risk-orange', label: 'orange' },
    { value: 'risk-purple', label: 'purple' },
    { value: 'risk-red', label: 'red' },
    { value: Infinity, label: '∞' },
    { value: undefined, label: '?' },
  ];
}
