import * as R from 'ramda';
import styled from 'styled-components/native';
import { colors } from 'react-native-elements';

interface Props {
  height: number;
}

export const SwipeDeleteBarContainer = styled.View<Props>`
  background-color: ${colors.secondary};
  width: 100%;
  padding-right: 20;
  height: ${R.prop('height')};
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
