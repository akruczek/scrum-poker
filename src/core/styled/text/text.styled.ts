import * as R from 'ramda';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { TEXT_SIZES, COLORS } from '@core/constants';

interface Props {
  size?: TEXT_SIZES;
  align?: 'left' | 'center' | 'right';
  margins?: string;
  color?: COLORS;
  decorationLine?: 'underline' | 'line-through' | 'underline line-through';
}

export const Text = styled.Text<Props & TextProps>`
  font-family: 'livvic';
  font-size: ${R.propOr(TEXT_SIZES.SMALL, 'size')}px;
  text-align: ${R.propOr('left', 'align')};
  text-decoration-line: ${R.propOr('none', 'decorationLine')};
  margin: ${R.propOr(0, 'margins')};
  color: ${(props: Props) => R.propOr('black', props.color || '', COLORS)};
`;
