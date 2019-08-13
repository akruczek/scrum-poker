import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TokenTooltip } from './token-tooltip';
import { Link, Text } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { Linking } from 'react-native';

describe('TokenTooltip', () => {
  describe('when TokenTooltip was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <TokenTooltip />
    );

    it('should render Link component', () => {
      expect(wrapper.root.findByType(Link))
        .toBeTruthy();
    });

    it('should render Text component with TRANSLATIONS.GENERATE_JIRA_TOKEN_HELP content', () => {
      expect(wrapper.root.findByType(Text).props.children)
        .toEqual(translate(TRANSLATIONS.GENERATE_JIRA_TOKEN_HELP));
    });
  });

  describe('when TokenTooltip onPress prop was called', () => {
    beforeEach(() => {
      spyOn(Linking, 'openURL');
    });

    const wrapper = renderer.create(
      <TokenTooltip />
    );

    it('should call Linking.openURL function', () => {
      act(() => {
        wrapper.root.findByType(Link).props.onPress();
      });

      expect(Linking.openURL)
        .toHaveBeenCalled();
    });
  });
});
