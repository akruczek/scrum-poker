import * as R from 'ramda';
import styled from 'styled-components/native';
import { colors } from 'react-native-elements';
import { COLORS } from '../../constants';

interface Props {
  height: number;
  color?: COLORS;
}

export const SwipeBarContainer = styled.View<Props>`
  background-color: ${R.propOr(colors.secondary, 'color')};
  width: 100%;
  padding-right: 20;
  height: ${R.prop('height')};
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
