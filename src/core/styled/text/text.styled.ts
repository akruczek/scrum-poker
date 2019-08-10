import * as R from 'ramda';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { TEXT_SIZES, COLORS, colors } from '@core/constants';
import { TextDecorationProperty } from 'csstype';

interface Props {
  size?: TEXT_SIZES;
  align?: 'left' | 'center' | 'right';
  margins?: string;
  color?: COLORS;
  decorationLine?: 'underline' | 'line-through' | 'underline line-through';
}

export const Text = styled.Text<Props & TextProps>`
  font-family: 'space-mono';
  font-size: ${R.propOr(TEXT_SIZES.REGULAR, 'size')}px;
  text-align: ${R.propOr('left', 'align')};
  text-decoration-line: ${R.propOr('none', 'decorationLine')};
  margin: ${R.propOr(0, 'margins')};
  color: ${(props: Props) => R.propOr('black', props.color || '', colors)};
`;
