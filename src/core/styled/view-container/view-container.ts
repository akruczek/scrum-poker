import * as R from 'ramda';
import styled from 'styled-components/native';

interface Props {
  margins?: string;
}

export const ViewContainer = styled.View<Props>`
  margin: ${R.propOr(0, 'margins')};
`;
