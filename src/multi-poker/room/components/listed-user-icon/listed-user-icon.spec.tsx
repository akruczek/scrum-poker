import * as React from 'react';
import renderer from 'react-test-renderer';
import { Icon } from 'react-native-elements';
import { Animatable } from '@core/components';
import { ListedUserIcon } from './listed-user-icon';

describe('ListedUserIcon', () => {
  describe('when ListedUserIcon was mounted with all needed props', () => {
    describe('and isCurrentUser prop equals true', () => {
      const wrapper = renderer.create(
        <ListedUserIcon isCurrentUser icon="check" />
      );

      it('should render Icon wrapped with Animatable', () => {
        expect(wrapper.root.findByType(Animatable).findByType(Icon))
          .toBeTruthy();
      });
    });

    describe('and isCurrentUser prop equals false', () => {
      const wrapper = renderer.create(
        <ListedUserIcon isCurrentUser={false} icon="check" />
      );

      it('should render Icon outside Animatable', () => {
        expect(wrapper.root.findByType(Icon).parent)
          .not.toEqual(Animatable);
      });
    });
  });
});
