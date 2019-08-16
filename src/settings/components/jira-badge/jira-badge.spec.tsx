import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Button } from 'react-native-elements';
import { Provider } from 'react-redux';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { JiraBadge } from './jira-badge';
import { JiraBadgeContent } from './components/jira-badge-content/jira-badge-content';
import { JiraBadgeIcon } from './components/jira-badge-icon/jira-badge-icon';
import { JiraLogin } from '../jira-login/jira-login';
import { appStore } from '../../../store/configure-store';
import { JiraConfig } from '../jira-config/jira-config';

describe('JiraBadge', () => {
  const authJira = jest.fn();
  const clearJiraStatus = jest.fn();
  const jiraUser = { accountId: 'some-account', avatarUrl: 'some-url', displayName: 'test von test' };
  const isPending = false;

  describe('when JiraBadge was mounted with all needed props', () => {
    describe('and jiraUser is defined', () => {
      const wrapper = renderer.create(
        <Provider store={appStore}>
          <JiraBadge {...{ authJira, clearJiraStatus, isPending, jiraUser }} />
        </Provider>
      );
      const { props } = wrapper.root.findByType(Button);

      it('should render Button with JiraBadgeContent as icon prop', () => {
        expect(props.icon.type)
          .toEqual(JiraBadgeContent);
      });

      it('should render Button with empty string as title prop', () => {
        expect(props.title)
          .toEqual('');
      });

      it('should render JiraConfig component after press on Button', () => {
        act(() => {
          props.onPress();
        });

        expect(wrapper.root.findByType(JiraConfig))
          .toBeTruthy();
      });

      it('should not render JiraConfig component after call JiraConfig handleClose prop', () => {
        act(() => {
          wrapper.root.findByType(JiraConfig).props.handleClose();
        });

        expect(wrapper.root.findAllByType(JiraConfig).length)
          .toEqual(0);
      });
    });

    describe('and jiraUser is not defined', () => {
      const wrapper = renderer.create(
        <JiraBadge {...{ authJira, clearJiraStatus, isPending }} jiraUser={null as any} />
      );
      const { props } = wrapper.root.findByType(Button);

      it('should render Button with JiraBadgeIcon as icon prop', () => {
        expect(props.icon.type)
          .toEqual(JiraBadgeIcon);
      });

      it('should render Button with TRANSLATIONS.CONNECT_WITH_JIRA as title prop', () => {
        expect(props.title)
          .toEqual(translate(TRANSLATIONS.CONNECT_WITH_JIRA))
      });

      it('should render Button with default handlePress function as onPress prop', () => {
        expect(props.onPress.name)
          .toEqual('handlePress');
      });

      it('should render JiraLogin after call Button onPress prop', () => {
        act(() => {
          props.onPress();
        });

        expect(wrapper.root.findByType(JiraLogin))
          .toBeTruthy();
      });

      it('should hide JiraLogin after call JiraLogin handleClose prop', () => {
        act(() => {
          wrapper.root.findByType(JiraLogin).props.handleClose();
        });

        expect(wrapper.root.findAllByType(JiraLogin).length)
          .toEqual(0);
      });
    });
  });
});
