import * as React from 'react';
import * as _Animatable from 'react-native-animatable';
import { ANIMATIONS, ANIMATION_DIRECTION } from '../../models/animations.models';

interface Props {
  children?: any;
  animation: ANIMATIONS;
  iterationCount: number | 'infinite';
  direction?: ANIMATION_DIRECTION;
}

export const Animatable = (props: Props) => {
  return (
    <_Animatable.View {...props} easing="ease" />
  );
};