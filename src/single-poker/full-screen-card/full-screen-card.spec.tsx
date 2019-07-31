import React from 'react';
import renderer from 'react-test-renderer';
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
  
    it('should render CardButton component with fullScreen prop card prop and handleBackPress as handleSelect prop', () => {
      const expectedProps = {
        fullScreen: true,
        card: { value: 1, label: '1' },
        handleSelect: handleBackPress,
      };
  
      expect(wrapper.root.findByType(CardButton).props)
        .toEqual(expectedProps);
    });
  });
});
