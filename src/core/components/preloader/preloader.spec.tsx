import * as React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import renderer from 'react-test-renderer';
import { Preloader } from './preloader';

describe('Preloader', () => {
  describe('when Preloader was mounted', () => {
    const wrapper = renderer.create(
      <Preloader />
    );

    it('should render ActivityIndicator inside Modal', () => {
      const modal = wrapper.root.findByType(Modal);

      expect(modal.props.animationType)
        .toEqual('fade');
      expect(modal.props.transparent)
        .toBeTruthy();
      expect(modal.findByType(ActivityIndicator).props.size)
        .toEqual('large');
    });
  });
});
