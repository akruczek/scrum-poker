import * as React from 'react';
import { ifElse } from '@core/helpers';
import { Icon } from 'react-native-elements';
import { ICON_SIZES, STATIC_ANIMATIONS } from '@core/models';
import { Animatable } from '@core/components';

interface Props {
  isCurrentUser: boolean;
  icon: string;
}

export const ListedUserIcon = ({ icon, isCurrentUser }: Props) => ifElse(
  isCurrentUser,
  <Animatable iterationCount="infinite" animation={STATIC_ANIMATIONS.SWING}>
    <Icon name={icon} size={ICON_SIZES.SMALL} />
  </Animatable>,
  <Icon name={icon} size={ICON_SIZES.SMALL} />,
);
