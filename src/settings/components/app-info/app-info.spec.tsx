import * as React from 'react';
import renderer from 'react-test-renderer';
import { AppInfo } from './app-info';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import * as pack from '../../../../package.json';

describe('AppInfo', () => {
  describe('when AppInfo was mounted', () => {
    const wrapper = renderer.create(
      <AppInfo />
    );

    it('should render Button with app version, expo client version and device info', () => {
      const button = wrapper.root.findByType(Button);

      expect(button)
        .toBeTruthy();
      expect(button.props.title)
        .toContain(pack.version);
      expect(button.props.title)
        .toContain(Constants.nativeBuildVersion);
      expect(button.props.title)
        .toContain(Constants.expoVersion);
      expect(button.props.title)
        .toContain(Constants.deviceYearClass);
      expect(button.props.title)
        .toContain(Constants.deviceName);
    });
  });
});
