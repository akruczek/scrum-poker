import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { TEXT_SIZES } from '@core/constants';
import { Text } from '../text/text.styled';
import { COLORS } from '../../constants/colors';

interface Props {
  children?: any;
  size?: TEXT_SIZES;
}

const StyledLink = styled(Text)`
  color: ${COLORS.LINK};
`;

export const Link = (props: TouchableOpacityProps & Props & TextProps) => (
  <TouchableOpacity onPress={props.onPress}>
    <StyledLink>
      {props.children}
    </StyledLink>
  </TouchableOpacity>
);
