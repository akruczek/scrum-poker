import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationProps } from '../../navigation/navigation.model';
import { SCREENS } from '../../navigation/screens';

interface Props {
  screen: SCREENS;
}

export const HeaderBackButton = (props: NavigationProps & Props) => (
  <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.navigate(props.screen)}>
    <Icon name="arrow-back" />
  </TouchableOpacity>
);
