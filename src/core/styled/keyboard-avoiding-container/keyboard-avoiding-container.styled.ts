import * as R from 'ramda';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const KeyboardAvoidingContainer = styled(KeyboardAvoidingView).attrs({
  behavior: R.propEq('OS', 'ios', Platform) ? 'padding' : undefined,
})`
  flex: 1;
`;
