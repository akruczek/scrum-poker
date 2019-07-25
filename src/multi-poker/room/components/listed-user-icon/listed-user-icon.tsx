import * as React from 'react';
import * as R from 'ramda';
import { ifElse } from '../../../../core/helpers';
import { Icon } from 'react-native-elements';
import { ICON_SIZES } from '../../../../core/models/custom-icons.models';
import { Animatable } from '../../../../core/components/animatable/animatable';
import { STATIC_ANIMATIONS, ANIMATION_DIRECTION } from '../../../../core/models/animations.models';

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
