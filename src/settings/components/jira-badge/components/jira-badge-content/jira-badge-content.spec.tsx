import * as React from 'react';
import renderer from 'react-test-renderer';
import { Avatar } from 'react-native-elements';
import { JiraBadgeContent } from './jira-badge-content';
import { Container, Text } from '@core/styled';

describe('JiraBadgeContent', () => {
  const jiraUser: any = {
    displayName: 'Test von Test',
    avatarUrl: 'some-url',
  };

  describe('when JiraBadgeContent was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <JiraBadgeContent jiraUser={jiraUser} />
    );

    it('should render two containers', () => {
      expect(wrapper.root.findAllByType(Container).length)
        .toEqual(2);
    });

    it('should render Avatar with jiraUser avatarUrl uri and Test with jiraUser display name', () => {
      const container = wrapper.root.findAllByType(Container)[0];

      expect(container.findByType(Avatar).props.source.uri)
        .toEqual(jiraUser.avatarUrl);
      expect(container.findByType(Text).props.children)
        .toEqual(jiraUser.displayName);
    });
  });
});
