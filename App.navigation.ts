import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { MainTabNavigator } from './src/main/main.navigation';

import * as SinglePokerNavigations from './src/single-poker/single-poker.navigation';

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      ...SinglePokerNavigations,
    }
  ),
);
