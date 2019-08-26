import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Modal } from 'react-native';
import jiraIcon from '@assets/custom-icons/jira.png';
import { KeyboardAvoidingContainer, CustomIcon, Text } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { JiraLogin } from './jira-login';
import { SpaceNameInput } from './components/space-name-input/space-name-input';
import { Input, Button } from 'react-native-elements';
import { TokenInput } from './components/token-input/token-input';
import { ButtonsSet, Preloader } from '@core/components';

describe('JiraLogin', () => {
  const mockedFunctions = {
    authJira: jest.fn(),
    handleClose: jest.fn(),
    clearJiraStatus: jest.fn(),
  };

  describe('when JiraLogin was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <JiraLogin {...mockedFunctions} isPending={false} isUser={false} />
    );
    const keyboardAvoidingContainer = wrapper.root.findByType(KeyboardAvoidingContainer);

    it('should render Modal with "slide" animation type', () => {
      expect(wrapper.root.findByType(Modal).props.animationType)
        .toEqual('slide');
    });

    it('should render CustomIcon with jiraIcon inside KeyboardAvoidingContainer', () => {
      expect(keyboardAvoidingContainer.findByType(CustomIcon).props.source)
        .toEqual(jiraIcon);
    });

    it('should render Text component with TRANSLATIONS.SIGN_IN_TO_JIRA inside KeyboardAvoidingContainer', () => {
      expect(keyboardAvoidingContainer.findAllByType(Text)[0].props.children)
        .toEqual(translate(TRANSLATIONS.SIGN_IN_TO_JIRA))
    });

    it('should render SpaceNameInput component inside KeyboardAvoidingContainer', () => {
      expect(keyboardAvoidingContainer.findByType(SpaceNameInput))
        .toBeTruthy();
    });

    it('should render email Input component inside KeyboardAvoidingContainer', () => {
      expect(keyboardAvoidingContainer.findAllByType(Input)[1].props.placeholder)
        .toEqual('email');
    });

    it('should render TokenInput inside KeyboardAvoidingContainer', () => {
      expect(keyboardAvoidingContainer.findByType(TokenInput))
        .toBeTruthy();
    });

    it('should render ButtonsSet inside KeyboardAvoidingContainer', () => {
      expect(keyboardAvoidingContainer.findByType(ButtonsSet))
        .toBeTruthy();
    });
  });

  describe('when JiraLogin was mounted with "true" isPending prop', () => {
    const wrapper = renderer.create(
      <JiraLogin {...mockedFunctions} isPending isUser={false} />
    );

    it('should render Preloader component', () => {
      expect(wrapper.root.findByType(Preloader))
        .toBeTruthy();
    });
  });

  describe('after first Button onPress prop was called and spaceName, email, token are provided', () => {
    const wrapper = renderer.create(
      <JiraLogin {...mockedFunctions} isPending isUser />
    );

    beforeEach(() => {
      act(() => {
        wrapper.root.findAllByType(Input).map(input => {
          input.props.onChangeText('value');
        });
      });
      act(() => {
        wrapper.root.findAllByType(Button)[0].props.onPress();
      });
    });

    it('should call handleJiraAuth', () => {
      expect(mockedFunctions.authJira)
        .toHaveBeenCalled();
    });
  });
});
