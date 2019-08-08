import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Button } from 'react-native-elements';
import { _SettingsOverview } from './settings';

describe('SettingsOverview', () => {
  describe('when SettingsOverview was mounted with all needed props', () => {
    const signOut = jest.fn();

    const wrapper: any = renderer.create(
      <_SettingsOverview signOut={signOut} />,
    );

    it('should render Button component with singOut action on press', () => {
      expect(wrapper.root.findByType(Button).props.onPress)
        .toEqual(signOut);
    });

    describe('and onPress prop was called', () => {
      beforeEach(() => {
        act(() => {
          wrapper.root.findByType(Button).props.onPress();
        });
      });

      it('should call signOut prop', () => {
        expect(signOut)
          .toHaveBeenCalled();
      });
    });
  });
});
