import React from 'react';
import { Modal } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { CardButton } from '@core/components';
import { FullScreenCard } from './full-screen-card';

describe('FullScreenCard', () => {
  const handleBackPress = jest.fn();
  
  describe('When FullScreenCard was mounted with all needed props', () => {
    const wrapper: any = renderer.create(
      <FullScreenCard card={{ value: 1, label: '1' }} handleBackPress={handleBackPress} />
    );

    it('Should render only 1 child', () => {
      expect(wrapper.toJSON().children.length)
        .toEqual(1);
    });

    it('should render Modal with animation type "slide"', () => {
      expect(wrapper.root.findByType(Modal).props.animationType)
        .toEqual('slide');
    });
  
    it('should render CardButton component with fullScreen prop card prop and handleBackPress as handleSelect prop', () => {
      const expectedProps = {
        fullScreen: true,
        card: { value: 1, label: '1' },
        handleSelect: handleBackPress,
      };
  
      expect(wrapper.root.findByType(CardButton).props)
        .toEqual(expectedProps);
    });

    it('should call handleBackPress after press on CardButton', () => {
      act(() => {
        wrapper.root.findByType(CardButton).props.handleSelect();
      });

      expect(handleBackPress)
        .toHaveBeenCalled();
    });
  });
});
