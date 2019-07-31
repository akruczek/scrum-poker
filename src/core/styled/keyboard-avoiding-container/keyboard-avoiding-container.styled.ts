import styled from 'styled-components/native';
import { KeyboardAvoidingView } from 'react-native';

export const KeyboardAvoidingContainer = styled(KeyboardAvoidingView).attrs({
  behavior: 'padding',
  contentContainerStyle: {
    flex: 1,
  },
})`
  flex: 1;
`;
