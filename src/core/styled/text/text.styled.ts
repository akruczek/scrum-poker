import * as R from 'ramda';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { TEXT_SIZES, COLORS } from '@core/constants';

interface Props {
  size?: TEXT_SIZES;
  align?: 'left' | 'center' | 'right';
  margins?: string;
  color?: COLORS;
}

export const Text = styled.Text<Props & TextProps>`
  font-family: 'space-mono';
  font-size: ${R.propOr(TEXT_SIZES.REGULAR, 'size')}px;
  text-align: ${R.propOr('left', 'align')};
  margin: ${R.propOr(0, 'margins')};
  color: ${R.propOr('black', 'color')};
`;
