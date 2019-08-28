import * as React from 'react';
import { Icon } from 'react-native-elements';
import { SwipeBarContainer } from '@core/styled';

interface Props {
  height: number;
}

export const SwipeDeleteBar = ({ height }: Props) => (
  <SwipeBarContainer height={height}>
    <Icon name="delete-forever" size={60} color="white" />
  </SwipeBarContainer>
);
