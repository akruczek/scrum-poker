import * as React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { Container } from '../../styled/container/container.styled';

export const Preloader = () => (
  <Modal animationType="fade" transparent={true}>
    <Container justifyContent="center" alignItems="center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <ActivityIndicator size="large" />
    </Container>
  </Modal>
);
