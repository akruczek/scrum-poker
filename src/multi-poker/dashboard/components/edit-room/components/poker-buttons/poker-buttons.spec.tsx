import * as React from 'react';
import renderer from 'react-test-renderer';
import { ButtonGroup } from 'react-native-elements';
import { pokers } from '@core/constants';
import { Separator } from '@core/styled';
import { PokerButtons } from './poker-buttons';

describe('PokerButtons', () => {
  const setPoker = jest.fn();

  describe('when PokerButtons was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <PokerButtons poker={pokers[0]} setPoker={setPoker} />
    );

    it('should render 1 Separator component', () => {
      expect(wrapper.root.findAllByType(Separator).length)
        .toEqual(1);
    });

    it('should render pokers.length / 2 ButtonGroup components', () => {
      expect(wrapper.root.findAllByType(ButtonGroup).length)
        .toEqual(Math.floor(pokers.length / 2));
    });
  });
});
