import * as React from 'react';
import renderer from 'react-test-renderer';
import jiraIcon from '@assets/custom-icons/jira.png';
import { CustomIcon } from '@core/styled';
import { JiraBadgeIcon } from './jira-badge-icon';

describe('JiraBadgeIcon', () => {
  describe('when JiraBadgeIcon was mounted', () => {
    const wrapper = renderer.create(
      <JiraBadgeIcon />
    );

    it('should render CustomIcon component with proper jira icon', () => {
      expect(wrapper.root.findByType(CustomIcon).props.source)
        .toEqual(jiraIcon);
    });
  });
});
