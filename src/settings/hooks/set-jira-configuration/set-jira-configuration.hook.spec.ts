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
  const handleClose = jest.fn();

  beforeEach(() => {
    testHook(() => {
      hook = useSetJiraConfiguration(jiraConfiguration, setJiraConfiguration, handleClose);
    });
  });

  it('should return by default empty fields from given configuration', () => {
    const [ _, __, fields ] = hook;
    const expectedFields = {
      customField: '',
      defaultIssueType: '',
      defaultIssueStatus: '',
    };

    expect(fields)
      .toEqual(expectedFields);
  });

  it('should return changed fields after call specific setter', () => {
    const [ _, __, ___, setters ] = hook;

    act(() => {
      setters['setCustomField']('someValue');
    });

    const [ ____, _____, fields ] = hook;

    expect(fields['customField'])
      .toEqual('someValue');
  });
});
