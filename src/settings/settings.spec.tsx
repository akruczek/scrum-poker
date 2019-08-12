import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Button } from 'react-native-elements';
import { _SettingsOverview } from './settings';
import { AppInfo } from './components/app-info/app-info';
import { JiraBadge } from './components/jira-badge/jira-badge';

describe('SettingsOverview', () => {
  const signOut = jest.fn();
  const authJira = jest.fn();
  const clearJiraStatus = jest.fn();
  const isJiraPending = false;
  const jiraUser: any = {};

  describe('when SettingsOverview was mounted with all needed props', () => {
    const wrapper: any = renderer.create(
      <_SettingsOverview {...{signOut, authJira, clearJiraStatus, isJiraPending, jiraUser}} />,
    );

    it('should render Button component with singOut action on press', () => {
      expect(wrapper.root.findAllByType(Button)[2].props.onPress)
        .toEqual(signOut);
    });

    describe('and Button onPress prop was called', () => {
      beforeEach(() => {
        act(() => {
          wrapper.root.findAllByType(Button)[2].props.onPress();
        });
      });

      it('should call signOut prop', () => {
        expect(signOut)
          .toHaveBeenCalled();
      });
    });

    it('should render AppInfo component', () => {
      expect(wrapper.root.findByType(AppInfo))
        .toBeTruthy();
    });

    it('should render JiraBadge component with jira user', () => {
      const jiraBadge = wrapper.root.findByType(JiraBadge)

      expect(jiraBadge)
        .toBeTruthy();
      expect(jiraBadge.props.jiraUser)
        .toEqual(jiraUser);
    });
  });
});
