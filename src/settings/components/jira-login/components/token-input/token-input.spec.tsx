import * as React from 'react';
import renderer from 'react-test-renderer';
import { TokenInput } from './token-input';
import { JiraLoginInput } from '../jira-login-input/jira-login-input';
import { Tooltip } from 'react-native-elements';
import { TokenTooltip } from '../token-tooltip/token-tooltip';

describe('TokenInput', () => {
  const setToken = jest.fn();

  describe('when TokenInput was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <TokenInput token="1234" setToken={setToken} />
    );

    it('should render JiraLoginInput component', () => {
      expect(wrapper.root.findByType(JiraLoginInput))
        .toBeTruthy();
    });

    it('should render Tooltip component with TokenTooltip as popover prop', () => {
      expect(wrapper.root.findByType(Tooltip).props.popover.type)
        .toEqual(TokenTooltip);
    });
  });
});
