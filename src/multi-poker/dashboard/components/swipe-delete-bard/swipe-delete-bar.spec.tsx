import * as React from 'react';
import renderer from 'react-test-renderer';
import { SwipeDeleteBarContainer } from '../../styled/swipe-delete-bar-container/swipe-delete-bar-container.styled';

describe('SwipeDeleteBar', () => {
  describe('when SwipeDeleteBar was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <SwipeDeleteBarContainer height={100} />
    );

    it('should render SwipeDeleteBarContainer with given height', () => {
      expect(wrapper.root.findByType(SwipeDeleteBarContainer).props.height)
        .toEqual(100);
    });

    it('should render one children', () => {
      expect(wrapper.root.children.length)
        .toEqual(1);
    });
  });
});
