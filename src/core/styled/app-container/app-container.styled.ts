import * as R from 'ramda';
import styled from 'styled-components/native';

interface Props {
  fullHorizontal?: boolean;
}

export const AppContainer = styled.View<Props>`
  flex: 1;
  padding: 0 ${(props: Props) => R.isNil(props.fullHorizontal) ? 10 : 0}px 10px;
`;
