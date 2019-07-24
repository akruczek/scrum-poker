import * as React from 'react';
import * as R from 'ramda';
import renderer from 'react-test-renderer';
import { SinglePoker } from './single-poker';
import { CARDS_STACK, CARDS } from '../core/constants/cards';
import { CardButton } from '../core/components/card-button/card-button';
import { FullScreenCard } from './full-screen-card/full-screen-card';

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

    it('should render CardButton component for each card from its cards list', () => {
      expect(wrapper.root.findAllByType(CardButton).length)
        .toEqual(CARDS_STACK[CARDS.RISK_POKER].length);
    });

    describe('when selectedCard state is not nil', () => {
      beforeEach(() => {
        wrapper.getInstance().setState({ selectedCard: true });
      });

      it('should display one FullScreenCard', () => {
        expect(wrapper.root.findByType(FullScreenCard)).toBeTruthy();
      });
    });
  });
});
