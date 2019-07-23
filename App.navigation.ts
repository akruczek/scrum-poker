import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import { MainTabNavigator } from './src/main/main.navigation';
import { SinglePoker } from './src/single-poker/single-poker';
import * as MultiPokerNavigations from './src/multi-poker/multi-poker.navigation';

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      SinglePoker: createStackNavigator({ 'single-poker': SinglePoker }),
      ...MultiPokerNavigations,
    },
  ),
);
