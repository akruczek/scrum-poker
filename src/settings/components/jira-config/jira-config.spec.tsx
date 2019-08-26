import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { ButtonsSet } from '@core/components/buttons-set/buttons-set';
import { _JiraConfig } from './jira-config';
import { JiraConfigBadge } from './components/jira-config-badge/jira-config-badge';

describe('JiraConfig', () => {
  const handleClose = jest.fn();
  const jiraSignOut = jest.fn();
  const setJiraConfiguration = jest.fn();
  const jiraConfiguration = {
    customField: 'customfield_00021',
    defaultIssueType: 'Story',
    defaultIssueStatus: 'To Do',
  };
  const jiraUser = {
    avatarUrl: 'some-url',
    displayName: 'Test',
    accountId: '1234',
  };

  describe('when JiraConfig was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <_JiraConfig
          jiraUser={jiraUser}
          jiraConfiguration={jiraConfiguration}
          handleClose={handleClose}
          jiraSignOut={jiraSignOut}
          setJiraConfiguration={setJiraConfiguration}
      />
    );

    it('should render Modal', () => {
      expect(wrapper.root.findByType(Modal))
        .toBeTruthy();
    });

    it('should render JiraConfigBadge', () => {
      expect(wrapper.root.findByType(JiraConfigBadge))
        .toBeTruthy();
    });

    it('should call jiraSignOut and handleClose after call JiraConfigBadge handleLogout prop', () => {
      act(() => {
        wrapper.root.findByType(JiraConfigBadge).props.handleLogout();
      });

      expect(jiraSignOut)
        .toHaveBeenCalled();
      expect(handleClose)
        .toHaveBeenCalled();
    });

    describe('and jiraConfiguration custom field is empty', () => {
      const wrapper = renderer.create(
        <_JiraConfig
            jiraUser={jiraUser}
            jiraConfiguration={{ customField: '', defaultIssueType: '', defaultIssueStatus: '' }}
            handleClose={handleClose}
            jiraSignOut={jiraSignOut}
            setJiraConfiguration={setJiraConfiguration}
        />
      );

      it('should do nothing', () => {
        act(() => {
          wrapper.root.findByType(ButtonsSet).findAllByType(Button)[0].props.onPress();
        });

        expect(setJiraConfiguration)
          .not.toHaveBeenCalled();
      });
    });

    describe('and jiraConfiguration custom field is not empty', () => {
      it('should call setJiraConfiguration with customField after press on first Button in ButtonsSet', () => {
        act(() => {
          wrapper.root.findByType(ButtonsSet).findAllByType(Button)[0].props.onPress();
        });

        expect(setJiraConfiguration)
          .toHaveBeenCalledWith(jiraConfiguration);
      });
    });
  });
});
