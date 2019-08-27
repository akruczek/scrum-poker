import * as React from 'react';
import { CustomIcon } from '@core/styled';
import { ICON_SIZES, PokerModel } from '@core/models';

interface Props {
  iconSize?: ICON_SIZES;
  poker: PokerModel;
}

export const ListItemIcon = ({ iconSize, poker }: Props) => (
  <CustomIcon size={iconSize || ICON_SIZES.STANDARD} source={poker.icon} />
);
