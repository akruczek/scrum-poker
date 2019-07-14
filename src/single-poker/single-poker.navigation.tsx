import { createStackNavigator } from 'react-navigation';
import { StandardPoker } from './standard-poker/standard-poker';

export const StandardPokerNavigation = createStackNavigator({
  'standard-poker': StandardPoker,
});

StandardPokerNavigation.navigationOptions = {
  tabBarLabel: 'Standard Poker',
};
