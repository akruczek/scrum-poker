import * as React from 'react';
import { ImageSourcePropType } from 'react-native';
import { CustomIcon } from '@core/styled';
import { ICON_SIZES } from '@core/models';

interface Props {
  icon: ImageSourcePropType;
}

export const ListedRoomIcon = ({ icon }: Props) => (
  <CustomIcon size={ICON_SIZES.SMALL} source={icon} />
);
