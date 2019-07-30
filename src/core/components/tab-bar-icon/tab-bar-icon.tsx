import * as React from 'react';
import { colors, COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: string;
  focused: boolean;
}

export const TabBarIcon = ({ icon, focused }: Props) => {
  const color = focused ? colors[COLORS.TAB_ICON_SELECTED] : colors[COLORS.TAB_ICON_DEFAULT];

  return (
    <Ionicons name={icon} size={26} style={{ marginBottom: -3 }} color={color} />
  );
};
