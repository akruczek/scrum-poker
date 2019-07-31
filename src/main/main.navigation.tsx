import * as React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { TabBarIcon } from '@core/components';
import { ICONS } from '@core/constants';
import { SinglePlayer } from './single-player/single-player';
import { MultiPlayer } from './multi-player/multi-player';
import { Settings } from './settings/settings';

interface Props {
  focused: boolean;
}

const SinglePlayerStack = createStackNavigator({
  'single-player': SinglePlayer,
});

SinglePlayerStack.navigationOptions = {
  tabBarLabel: 'Single',
  tabBarOptions: { showLabel: false },
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.CONTACT} />
  ),
};

const MultiPlayerStack = createStackNavigator({
  'multi-player': MultiPlayer,
});

MultiPlayerStack.navigationOptions = {
  tabBarLabel: 'Multi',
  tabBarOptions: { showLabel: false },
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.CONTACTS} />
  ),
};

const SettingsStack = createStackNavigator({
  'settings': Settings,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: { showLabel: false },
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.OPTIONS} />
  ),
};

export const MainTabNavigator = createBottomTabNavigator({
  MultiPlayerStack,
  SinglePlayerStack,
  SettingsStack,
});
