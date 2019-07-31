import * as React from 'react';
import * as R from 'ramda';
import renderer from 'react-test-renderer';
import { CARDS_STACK, CARDS } from '@core/constants';
import { CardButton } from '@core/components';
import { SinglePoker } from './single-poker';

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
  });
});
