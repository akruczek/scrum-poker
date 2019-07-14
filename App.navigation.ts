import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { MainTabNavigator } from './src/main/main.navigation';
import { Counter } from './src/counter/counter';

import * as SinglePokerNavigations from './src/single-poker/single-poker.navigation';

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Counter,
      ...SinglePokerNavigations,
    }
  ),
);
