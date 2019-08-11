import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface Props {
  icon: string;
  focused: boolean;
}

export const TabBarIcon = ({ icon, focused }: Props) => {
  const color = focused ? COLORS.TAB_ICON_SELECTED : COLORS.TAB_ICON_DEFAULT;

  return (
    <Ionicons name={icon} size={26} style={{ marginBottom: -3 }} color={color} />
  );
};
