import { createStackNavigator } from 'react-navigation';
import { SettingsOverview } from './settings-overview/settings-overview';

export const SettingsNavigation = createStackNavigator({
  'settings': SettingsOverview,
});

SettingsNavigation.navigationOptions = {
  tabBarLabel: 'Room',
};
