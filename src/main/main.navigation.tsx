import * as React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { SinglePlayer, MultiPlayer, Settings } from './components';
import { TabBarIcon } from '../core/components/tab-bar-icon/tab-bar-icon';
import { ICONS } from '../core/constants/icons';

interface Props {
  focused: boolean;
}

const SinglePlayerStack = createStackNavigator({
  'single-player': SinglePlayer,
});

SinglePlayerStack.navigationOptions = {
  tabBarLabel: 'Single',
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.CONTACT} />
  ),
};

const MultiPlayerStack = createStackNavigator({
  'multi-player': MultiPlayer,
});

MultiPlayerStack.navigationOptions = {
  tabBarLabel: 'Multi',
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.CONTACTS} />
  ),
};

const SettingsStack = createStackNavigator({
  'settings': Settings,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.OPTIONS} />
  ),
};

export const MainTabNavigator = createBottomTabNavigator({
  MultiPlayerStack,
  SinglePlayerStack,
  SettingsStack,
});
