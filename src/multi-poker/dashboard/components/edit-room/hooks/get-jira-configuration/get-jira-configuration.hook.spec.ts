import { testHook } from '@test-utils/test-hook';
import { pokers } from '@core/constants';
import { useGetJiraConfiguration } from './get-jira-configuration.hook';
import { act } from 'react-test-renderer';

describe('useGetJiraConfiguration', () => {
  const room: any = {
    id: 'id',
    name: 'name',
    description: 'string',
    users: {},
    discovered: false,
    allAdmins: true,
    poker: pokers[0],
    projectKey: 'XX',
    customField: null,
    defaultIssueType: 'Story',
    defaultIssueStatus: 'To Do',
  };

  const mockedJiraConfiguration = {
    customField: 'customfield_10021',
    defaultIssueType: '',
    defaultIssueStatus: '',
  };

  let hook: any;

  describe('when useGetJiraConfiguration hook was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useGetJiraConfiguration(room, mockedJiraConfiguration);
      });
    });

    it('should return jira config fields from room or jiraConfig', () => {
      const [
        customField, _,
        defaultIssueType, __,
        defaultIssueStatus, ___,
      ] = hook;

      expect(customField)
        .toEqual('customfield_10021');
      expect(defaultIssueType)
        .toEqual('Story');
      expect(defaultIssueStatus)
        .toEqual('To Do');
    });

    it('should set jira config field after call its setter with given value', () => {
      const [
        _, setCustomField,
        __, setDefaultIssueType,
        ___, setDefaultIssueStatus,
      ] = hook;

      act(() => {
        setCustomField('new_field');
        setDefaultIssueType('new_type');
        setDefaultIssueStatus('new-STATUS');
      });

      const [
        customField, ____,
        defaultIssueType, _____,
        defaultIssueStatus, ______,
      ] = hook;

      expect(customField)
        .toEqual('new_field');
      expect(defaultIssueType)
        .toEqual('new_type');
      expect(defaultIssueStatus)
        .toEqual('new-STATUS');
    });
  });
});
