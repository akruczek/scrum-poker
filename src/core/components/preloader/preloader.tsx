import * as React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { Container } from '../../styled/container/container.styled';

interface Props {
  isVisible?: boolean;
}

export const Preloader = ({ isVisible }: Props) => (
  <Modal animationType="fade" transparent={true} visible={isVisible}>
    <Container justifyContent="center" alignItems="center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <ActivityIndicator size="large" />
    </Container>
  </Modal>
);
