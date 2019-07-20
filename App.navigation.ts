import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { MainTabNavigator } from './src/main/main.navigation';

import * as SinglePokerNavigations from './src/single-poker/single-poker.navigation';
import * as MultiPokerNavigations from './src/multi-poker/multi-poker.navigation';

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      ...SinglePokerNavigations,
      ...MultiPokerNavigations,
    }
  ),
);
