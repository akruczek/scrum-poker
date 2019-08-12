import * as React from 'react';
import renderer from 'react-test-renderer';
import { Button } from 'react-native-elements';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { JiraBadge } from './jira-badge';
import { JiraBadgeContent } from './components/jira-badge-content/jira-badge-content';
import { JiraBadgeIcon } from './components/jira-badge-icon/jira-badge-icon';
import { JiraLogin } from '../jira-login/jira-login';

describe('JiraBadge', () => {
  const authJira = jest.fn();
  const clearJiraStatus = jest.fn();
  const jiraUser = { accountId: 'some-account', avatarUrl: 'some-url', displayName: 'test von test' };
  const isPending = false;

  describe('when JiraBadge was mounted with all needed props', () => {
    describe('and jiraUser is defined', () => {
      const wrapper = renderer.create(
        <JiraBadge {...{ authJira, clearJiraStatus, isPending, jiraUser }} />
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

      it('should render Button with NOOP function as onPress prop', () => {
        expect(props.onPress())
          .toEqual(null);
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
    });
  });
});
