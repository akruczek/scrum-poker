import * as React from 'react';
import renderer from 'react-test-renderer';
import { _Auth } from './auth';
import { AUTH_TYPES } from './models/auth.models';
import { Text } from '../core/styled/text/text.styled';
import { Button, Input } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

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

    describe('and type prop equals join', () => {
      const wrapper = renderer.create(
        <_Auth signIn={signIn} isPending={false} type={AUTH_TYPES.JOIN} />,
      );

      it('should render Text component with JOIN SESSION content and button with JOIN content', () => {
        expect(wrapper.root.findByType(Text).props.children)
          .toEqual('JOIN SESSION');

        expect(wrapper.root.findByType(Button).props.title)
          .toEqual('JOIN');
      });
    });

    describe('and type prop equals login', () => {
      const wrapper = renderer.create(
        <_Auth signIn={signIn} isPending={false} type={AUTH_TYPES.LOGIN} />,
      );

      it('should render Text component with SIGN IN content and button with LOGIN content', () => {
        expect(wrapper.root.findByType(Text).props.children)
          .toEqual('SIGN IN');

        expect(wrapper.root.findByType(Button).props.title)
          .toEqual('LOGIN');
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
