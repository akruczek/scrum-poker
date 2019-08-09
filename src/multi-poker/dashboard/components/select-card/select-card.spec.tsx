import * as React from 'react';
import renderer from 'react-test-renderer';
import { Modal } from 'react-native';
import { ScrollContainer } from '@core/styled';
import { SelectCard } from './select-card';

describe('SelectCard', () => {
  const handleSelect = jest.fn();

  // TODO: test for other pokers than standard_poker

  describe('when SelectCard was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <SelectCard handleSelect={handleSelect} />
    );

    it('should render Modal with slide animationType prop', () => {
      expect(wrapper.root.findByType(Modal).props.animationType)
        .toEqual('slide');
    });

    it('should render Modal with ScrollContainer inside', () => {
      expect(wrapper.root.findByType(Modal).findByType(ScrollContainer))
        .toBeTruthy();
    });
  });
});
