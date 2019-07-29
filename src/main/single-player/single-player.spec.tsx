import * as React from 'react';
import renderer from 'react-test-renderer';
import { _SinglePlayer } from './single-player';
import { PokersList } from '../../single-poker/pokers-list/pokers-list';

describe('SinglePlayer', () => {
  describe('when SinglePlayer was mounted with all needed props', () => {
    const mockedNavigation: any = {
      navigate: jest.fn(),
    };

    const wrapper: any = renderer.create(
      <_SinglePlayer navigation={mockedNavigation} />,
    );

    it('should render PokersList component', () => {
      expect(wrapper.root.findByType(PokersList))
        .toBeTruthy();
    });
  });
});
