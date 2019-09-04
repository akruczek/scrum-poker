import { parseJiraProjectIssues } from './parse-jira-project-issues-data.helper';

describe('when parseJiraProjectIssues was called', () => {
  const payload = [
    {
      id: '1234',
      key: 'XX-1234',
      fields: {
        created: '12.12.2012',
        summary: 'Summary of Field',
        status: {
          name: 'SUPER STRONG STATUS',
        },
        issuetype: {
          name: 'SUPER STRONG ISSUE',
        },
      },
    },
    {
      id: '0000',
      key: 'XX-0000',
      fields: {
        created: '11.11.2011',
        summary: 'Summary',
        status: {
          name: 'SUPER STATUS',
        },
        issuetype: {
          name: 'SUPER ISSUE',
        },
      },
    },
    {
      id: '1010',
      key: 'XX-1010',
      fields: {
        created: '10.10.2010',
        summary: 'As I boolean I want to be number',
        status: {
          name: 'To Do',
        },
        issuetype: {
          name: 'Task',
        },
      },
    },
  ];

  it('should pick specific values from each value from given array', () => {
    const expectedResult = [
      {
        id: '1234',
        key: 'XX-1234',
        createdAt: '12.12.2012',
        status: 'SUPER STRONG STATUS',
        summary: 'Summary of Field',
        issueType: 'SUPER STRONG ISSUE',
      },
      {
        id: '0000',
        key: 'XX-0000',
        createdAt: '11.11.2011',
        summary: 'Summary',
        status: 'SUPER STATUS',
        issueType: 'SUPER ISSUE',
      },
      {
        id: '1010',
        key: 'XX-1010',
        createdAt: '10.10.2010',
        summary: 'As I boolean I want to be number',
        status: 'To Do',
        issueType: 'Task',
      },
    ];

    expect(parseJiraProjectIssues(payload))
      .toEqual(expectedResult);
  });
});
