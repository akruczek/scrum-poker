import * as React from 'react';
import * as R from 'ramda';
import renderer, { act } from 'react-test-renderer';
import { CARDS_STACK, CARDS } from '@core/constants';
import { CardButton } from '@core/components';
import { AppContainer, ScrollContainer } from '@core/styled';
import { SinglePoker } from './single-poker';
import { FullScreenCard } from './components/full-screen-card/full-screen-card';

describe('SinglePoker', () => {
  describe('when SinglePoker was mounted with all needed props', () => {
    const mockedNavigation: any = {
      navigate: jest.fn(),
      getParam: R.prop(R.__, ({
        title: 'Scrum Poker',
        cards: CARDS.RISK_POKER,
      })),
    };

    const wrapper: any = renderer.create(
      <SinglePoker navigation={mockedNavigation} />,
    );

    it('should wrap whole content with AppContainer', () => {
      expect(wrapper.root.findByType(AppContainer).parent.children.length)
        .toEqual(1);
    });

    it('should wrap all CardButtons with ScrollContainer without scroll indicator', () => {
      const scrollContainer = wrapper.root.findByType(ScrollContainer);

      expect(scrollContainer.props.showsVerticalScrollIndicator)
        .toBeFalsy();
      expect(scrollContainer.findAllByType(CardButton).length)
        .toBeGreaterThan(0);
    });

    it('should render CardButton component for each card from its cards list', () => {
      expect(wrapper.root.findAllByType(CardButton).length)
        .toEqual(CARDS_STACK[CARDS.RISK_POKER].length);
    });

    it('should show FullScreenCard with pressed card prop (outside ScrollContainer) after press on CardButton', () => {
      const card = { value: 1, label: '1' };

      act(() => {
        wrapper.root.findAllByType(CardButton)[0].props.handleSelect(card);
      });

      const fullScreenCard = wrapper.root.findByType(FullScreenCard);

      expect(fullScreenCard)
        .toBeTruthy();
      expect(fullScreenCard.props.card)
        .toEqual(card);
      expect(fullScreenCard.parent.type)
        .not.toEqual('ScrollView');
      
      act(() => {
        fullScreenCard.props.handleBackPress();
      });

      expect(wrapper.root.findAllByType(FullScreenCard))
        .toEqual([]);
    });

    it('should render with "Scrum Poker" title', () => {
      expect(SinglePoker.navigationOptions({ navigation: mockedNavigation }).title)
        .toEqual('Scrum Poker');
    });

    it('should render HeaderBackButton in header on the left side', () => {
      const headerIcon = SinglePoker.navigationOptions({ navigation: mockedNavigation }).headerLeft;

      expect(headerIcon)
        .toBeTruthy();
      expect(headerIcon.props.screen)
        .toEqual('single-player');
    });
  });
});
