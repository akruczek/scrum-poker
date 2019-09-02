import * as React from 'react';
import renderer from 'react-test-renderer';
import { Text } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { JiraConfigHeader } from './jira-config-header';

describe('JiraConfigHeader', () => {
  describe('when JiraConfigHeader was mounted', () => {
    const wrapper = renderer.create(
      <JiraConfigHeader />
    );

    it('should render Text component with JIRA_CONFIGURATION content', () => {
      expect(wrapper.root.findByType(Text).props.children)
        .toEqual(translate(TRANSLATIONS.JIRA_CONFIGURATION));
    });
  });
});
