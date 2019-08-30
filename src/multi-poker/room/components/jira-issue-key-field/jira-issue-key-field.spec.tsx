import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Input } from 'react-native-elements';
import { Separator, Text } from '@core/styled';
import { JiraIssueKeyField } from './jira-issue-key-field';

describe('JiraIssueKeyField', () => {
  const setIssueKey = jest.fn();

  describe('when JiraIssueKeyField was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <JiraIssueKeyField issueKey="XK" setIssueKey={setIssueKey} />
    );

    it('should render one Separator component', () => {
      expect(wrapper.root.findAllByType(Separator))
        .toHaveLength(1);
    });

    it('should render one Input component', () => {
      expect(wrapper.root.findAllByType(Input))
        .toHaveLength(1);
    });

    it('should render one Text component', () => {
      expect(wrapper.root.findAllByType(Text))
        .toHaveLength(1);
    });

    it('should call setIssueKey after change input value', () => {
      act(() => {
        wrapper.root.findByType(Input).props.onChangeText('y');
      });

      expect(setIssueKey)
        .toHaveBeenCalledWith('y');
    });
  });
});
