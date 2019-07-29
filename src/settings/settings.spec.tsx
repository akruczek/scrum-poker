import * as React from 'react';
import renderer from 'react-test-renderer';
import { Button } from 'react-native-elements';
import { _SettingsOverview } from './settings';

describe('SettingsOverview', () => {
  describe('when SettingsOverview was mounted with all needed props', () => {
    const signOut = jest.fn();
    const mockedNavigation: any = {
      navigate: jest.fn(),
    };

    const wrapper: any = renderer.create(
      <_SettingsOverview navigation={mockedNavigation} signOut={signOut} />,
    );

    it('should render Button component with singOut action on press', () => {
      expect(wrapper.root.findByType(Button).props.onPress)
        .toEqual(signOut);
    });
  });
});
