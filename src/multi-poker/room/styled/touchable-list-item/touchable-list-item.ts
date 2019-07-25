import styled from 'styled-components/native';
import * as R from 'ramda';
import { COLORS, colors } from '../../../../core/constants/colors';
import { TouchableOpacityProps } from 'react-native';

interface Props {
  color: COLORS;
}

export const TouchableListItem = styled.TouchableOpacity<Props & TouchableOpacityProps>`
  background-color: ${(props: Props) => colors[props.color]};
  opacity: ${(props: Props) => R.propEq(COLORS.WHITE, 'color', props) ? 1 : 0.7};
`;
