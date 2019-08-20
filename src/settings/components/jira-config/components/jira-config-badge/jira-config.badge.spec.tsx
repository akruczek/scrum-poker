import * as React from 'react';
import renderer from 'react-test-renderer';
import { Avatar, Button } from 'react-native-elements';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { Separator } from '@core/styled';
import { JiraConfigBadge } from './jira-config-badge';

describe('JiraConfigBadge', () => {
  const handleLogout = jest.fn();
  const jiraUser = {
    avatarUrl: 'some-url',
    displayName: 'hello',
    accountId: '1234',
  };

  describe('when JiraConfigBadge was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <JiraConfigBadge handleLogout={handleLogout} jiraUser={jiraUser} />
    );

    it('should render 3 children', () => {
      expect(wrapper.root.children.length)
        .toEqual(3);
    });

    it('should render Avatar with jiraUser avatarUrl as source', () => {
      expect(wrapper.root.findByType(Avatar).props.source.uri)
        .toEqual(jiraUser.avatarUrl);
    });

    it('should render Button with LOGOUT translation as title prop', () => {
      expect(wrapper.root.findByType(Button).props.title)
        .toEqual(translate(TRANSLATIONS.LOGOUT));
    });

    it('should render 2 Separator components', () => {
      expect(wrapper.root.findAllByType(Separator).length)
        .toEqual(2);
    });
  });
});
