import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ActivityIndicator, Platform } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { KeyboardAvoidingContainer } from '@core/styled';
import { _Auth } from './auth';
import { AUTH_TYPES } from './models/auth.models';
import { isPlatform } from '../core/helpers';

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

    describe('and isPending prop equals false', () => {
      const wrapper = renderer.create(
        <_Auth signIn={signIn} isPending={false} type={AUTH_TYPES.JOIN} />,
      );

      it('should render email input component', () => {
        expect(wrapper.root.findByType(Input))
          .toBeTruthy();
      });

      describe('and provided email address does not match email pattern', () => {
        act(() => {
          wrapper.root.findByType(Button).props.onPress();
        });

        it('should not call signIn prop after press on Button', () => {
          expect(signIn)
            .not.toHaveBeenCalled();
        });
      });
  
      describe('and provided email address match email pattern', () => {
        act(() => {
          wrapper.root.findByType(Input).props.onChangeText('test@example.com')
        });

        it('should call signIn prop with provided email after press on Button', () => {
          act(() => {
            wrapper.root.findByType(Button).props.onPress();
          });

          expect(signIn)
            .toHaveBeenCalledWith('test@example.com');
        });
      });
    });

    describe('and current Platform is android', () => {
      beforeEach(() => {
        Platform.OS = 'android';
      });
      
      it('should render KeyboardAvoidingContainer with 90 keyboardVerticalOffset', () => {
        const wrapper = renderer.create(
          <_Auth signIn={signIn} isPending={false} type={AUTH_TYPES.JOIN} />,
        );

        expect(wrapper.root.findByType(KeyboardAvoidingContainer).props.keyboardVerticalOffset)
          .toEqual(90);
      });
    });

    describe('and current Platform is iOS', () => {
      beforeEach(() => {
        Platform.OS = 'ios';
      });

      const wrapper = renderer.create(
        <_Auth signIn={signIn} isPending={false} type={AUTH_TYPES.JOIN} />,
      );

      it('should render KeyboardAvoidingContainer with 70 keyboardVerticalOffset', () => {
        expect(wrapper.root.findByType(KeyboardAvoidingContainer).props.keyboardVerticalOffset)
          .toEqual(70);
      });
    });
  });
});
