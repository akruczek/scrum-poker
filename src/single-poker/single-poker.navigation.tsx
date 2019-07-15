import { createStackNavigator } from 'react-navigation';
import { StandardPoker } from './standard-poker/standard-poker';
import { FibonacciPoker } from './fibonacci-poker/fibonacci-poker';
import { TShirtPoker } from './t-shirt-poker/t-shirt-poker';
import { RiskPoker } from './risk-poker/risk-poker';

export const StandardPokerNavigation = createStackNavigator({
  'standard-poker': StandardPoker,
});

StandardPokerNavigation.navigationOptions = {
  tabBarLabel: 'Standard Poker',
};

export const FibonacciPokerNavigation = createStackNavigator({
  'fibonacci-poker': FibonacciPoker,
});

FibonacciPokerNavigation.navigationOptions = {
  tabBarLabel: 'Fibonacci Poker',
};

export const TShirtPokerNavigation = createStackNavigator({
  't-shirt-poker': TShirtPoker,
});

TShirtPokerNavigation.navigationOptions = {
  tabBarLabel: 'T-Shirt Poker',
};

export const RiskPokerNavigation = createStackNavigator({
  'risk-poker': RiskPoker,
})

RiskPokerNavigation.navigationOptions = {
  tabBarLabel: 'Risk Poker',
};