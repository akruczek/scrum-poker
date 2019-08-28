import * as React from 'react';
import renderer from 'react-test-renderer';
import { SwipeBarContainer } from '@core/styled';

describe('SwipeDeleteBar', () => {
  describe('when SwipeDeleteBar was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <SwipeBarContainer height={100} />
    );

    it('should render SwipeBarContainer with given height', () => {
      expect(wrapper.root.findByType(SwipeBarContainer).props.height)
        .toEqual(100);
    });

    it('should render one children', () => {
      expect(wrapper.root.children.length)
        .toEqual(1);
    });
  });
});
