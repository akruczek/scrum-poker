import { parseJiraProjectsData } from './parse-jira-projects-data.helper';

describe('when parseJiraProjectsData was called', () => {
  const payload = [
    {
      id: '1234',
      key: 'KE-1234',
      name: 'NAME 1',
      avatarUrls: {
        '32x32': 'some-32-url',
      },
    },
    {
      id: '0000',
      key: 'KE-0000',
      name: 'NAME 0',
      avatarUrls: {
        '42x42': 'some-42-url',
      },
    },
  ];

  it('should pick specific values from each value fo given array', () => {
    const expectedPayload = [
      {
        id: '1234',
        key: 'KE-1234',
        displayName: 'NAME 1',
        avatarUrl: 'some-32-url',
      },
      {
        id: '0000',
        key: 'KE-0000',
        displayName: 'NAME 0',
        avatarUrl: 'some-42-url'
      },
    ];

    expect(parseJiraProjectsData(payload))
      .toEqual(expectedPayload);
  });
});
