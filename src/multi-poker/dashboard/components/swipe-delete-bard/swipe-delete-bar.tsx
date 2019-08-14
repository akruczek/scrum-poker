import * as React from 'react';
import { Icon } from 'react-native-elements';
import { SwipeDeleteBarContainer } from '../../styled/swipe-delete-bar-container/swipe-delete-bar-container.styled';

interface Props {
  height: number;
}

export const SwipeDeleteBar = ({ height }: Props) => (
  <SwipeDeleteBarContainer height={height}>
    <Icon name="delete-forever" size={60} color="white" />
  </SwipeDeleteBarContainer>
);
