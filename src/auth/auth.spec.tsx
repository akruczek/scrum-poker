import * as React from 'react';
import renderer from 'react-test-renderer';
import { ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { _Auth } from './auth';
import { AUTH_TYPES } from './models/auth.models';

describe('Auth', () => {
  const signIn = jest.fn();

  describe('when Auth was mounted with all needed props', () => {
    describe('and isPending prop equals true', () => {
      const wrapper = renderer.create(
        <_Auth signIn={signIn} isPending={true} type={AUTH_TYPES.JOIN} />,
      );

      it('should render ActivityIndicator component', () => {
        expect(wrapper.root.findByType(ActivityIndicator))
          .toBeTruthy();
      });
    });

    it('should render email input component', () => {
      const wrapper = renderer.create(
        <_Auth signIn={signIn} isPending={false} type={AUTH_TYPES.JOIN} />,
      );

      expect(wrapper.root.findByType(Input))
        .toBeTruthy();
    });
  });
});
