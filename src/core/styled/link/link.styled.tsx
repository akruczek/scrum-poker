import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../text/text.styled';
import { TextProps } from 'react-native';
import { colors, COLORS } from '../../constants/colors';
import { TEXT_SIZES } from '@core/constants';

interface Props {
  children?: any;
  size?: TEXT_SIZES;
}

const StyledLink = styled(Text)`
  color: ${colors[COLORS.LINK]};
`;

export const Link = (props: TouchableOpacityProps & Props & TextProps) => (
  <TouchableOpacity onPress={props.onPress}>
    <StyledLink>
      {props.children}
    </StyledLink>
  </TouchableOpacity>
);
