import * as React from 'react';
import renderer from 'react-test-renderer';
import { CardIcon } from '@core/components';
import { ListedUserEstimation } from './listed-user-estimation';
import { ListedUserIcon } from '../listed-user-icon/listed-user-icon';

describe('ListedUserEstimation', () => {
  describe('when ListedUserEstimation was mounted with all needed props', () => {
    describe('and given props satisfies to render estimation', () => {
      const props = {
        isValuePresent: true,
        isRoomDiscovered: true,
        isCurrentUser: false,
        selectedLabel: '1',
        selectedValue: 1,
        handlePress: jest.fn(),
        icon: 'help',
      };

      const wrapper = renderer.create(
        <ListedUserEstimation {...props} />
      );

      it('should render CardIcon component', () => {
        expect(wrapper.root.findByType(CardIcon))
          .toBeTruthy();
      });
    });

    describe('and given props does not satisfies to render estimation', () => {
      const props = {
        isValuePresent: true,
        isRoomDiscovered: false,
        isCurrentUser: false,
        selectedLabel: '1',
        selectedValue: 1,
        handlePress: jest.fn(),
        icon: 'help',
      };

      const wrapper = renderer.create(
        <ListedUserEstimation {...props} />
      );

      it('should render ListedUserIcon component', () => {
        expect(wrapper.root.findByType(ListedUserIcon))
          .toBeTruthy();
      });
    });
  });
});
