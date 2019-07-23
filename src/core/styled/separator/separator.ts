import * as R from 'ramda';
import styled from 'styled-components/native';
import { Divider } from 'react-native-elements';

interface Props {
  margin?: number;
}

export const Separator = styled(Divider)<Props>`
  margin: ${R.propOr(0, 'margin')}px 0;
`;
