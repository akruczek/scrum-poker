import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface Props {
  icon: string;
  onPress: () => void;
}

export const HeaderRightIcon = ({ icon, onPress }: Props) => (
  <TouchableOpacity style={{ marginRight: 10 }} onPress={onPress}>
    <Icon name={icon} />
  </TouchableOpacity>
);
