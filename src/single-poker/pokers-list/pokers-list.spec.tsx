import * as React from 'react';
import renderer from 'react-test-renderer';
import { PokersList } from './pokers-list';
import { ListItem } from '../list-item/list-item';
import { pokers } from '../../core/constants/pokers';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';

describe('PokersList', () => {
  describe('when PokersList was mounted with all needed props', () => {
    const handleNavigate = jest.fn();
    const wrapper: any = renderer.create(
      <PokersList handleNavigate={handleNavigate} />,
    );

    it('should render ListItem for each poker from global pokers list wrapped with ScrollContainer', () => {
      expect(wrapper.root.findByType(ScrollContainer).findAllByType(ListItem).length)
        .toEqual(pokers.length);
    });

    it('should pass to each ListItem poker and handleNavigate as handlePress prop', () => {
      const expectedProps = {
        poker: pokers[0],
        handlePress: handleNavigate,
      };

      expect(wrapper.root.findAllByType(ListItem)[0].props)
        .toEqual(expectedProps);
    });
  });
});
