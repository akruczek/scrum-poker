import * as R from 'ramda';
import styled from 'styled-components/native';

interface Props {
  margin?: number;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
}

export const Box = styled.View<Props>`
  margin: ${R.propOr(0, 'margin')}px;
  margin-top: ${R.propOr(0, 'top')}px;
  margin-right: ${R.propOr(0, 'right')}px;
  margin-bottom: ${R.propOr(0, 'bottom')}px;
  margin-left: ${R.propOr(0, 'left')}px;
`;
