import * as R from 'ramda';
import styled from 'styled-components/native';

interface Props {
  margins?: string;
  direction?: 'row' | 'column';
}

export const ViewContainer = styled.View<Props>`
  margin: ${R.propOr(0, 'margins')};
  flex-direction: ${R.propOr('column', 'direction')};
`;
