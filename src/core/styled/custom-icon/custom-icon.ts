import * as R from 'ramda';
import styled from 'styled-components/native';
import { ICON_SIZES } from '../../models/custom-icons.models';
import { ImageProps } from 'react-native';

interface Props {
  size: ICON_SIZES;
}

export const CustomIcon = styled.Image<Props & ImageProps>`
  width: ${R.propOr(ICON_SIZES.STANDARD, 'size')}px;
  height: ${R.propOr(ICON_SIZES.STANDARD, 'size')}px;
`;
