import { testHook } from '@test-utils/test-hook';
import { useSetJiraConfiguration } from './set-jira-configuration.hook';
import { act } from 'react-test-renderer';

describe('when useSetJiraConfiguration was called', () => {
  let hook: any;
  const setJiraConfiguration = jest.fn();
  const jiraConfiguration = {
    customField: 'custom_field',
    defaultIssueType: 'Story',
    defaultIssueStatus: 'To Do',
  };

  beforeEach(() => {
    testHook(() => {
      hook = useSetJiraConfiguration(jiraConfiguration, setJiraConfiguration);
    });
  });

  it('should return by default empty fields from given configuration', () => {
    const [ fields ] = hook;
    const expectedFields = {
      customField: '',
      defaultIssueType: '',
      defaultIssueStatus: '',
    };

    expect(fields)
      .toEqual(expectedFields);
  });

  it('should return changed fields after call specific setter', () => {
    const [ _, setters ] = hook;

    act(() => {
      setters['setCustomField']('someValue');
    });

    const [ fields ] = hook;

    expect(fields['customField'])
      .toEqual('someValue');
  });
});
