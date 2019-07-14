import * as React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { SinglePlayer, MultiPlayer, Settings } from './components';
import { TabBarIcon } from '../core/components/tab-bar-icon/tab-bar-icon';
import { ICONS } from '../core/constants/icons';

interface Props {
  focused: boolean;
}

const HomeStack = createStackNavigator({
  SinglePlayer,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Single',
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.CONTACT} />
  ),
};

const LinksStack = createStackNavigator({
  MultiPlayer,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Multi',
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.CONTACTS} />
  ),
};

const SettingsStack = createStackNavigator({
  Settings,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: (props: Props) => (
    <TabBarIcon focused={props.focused} icon={ICONS.OPTIONS} />
  ),
};

export const MainTabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
