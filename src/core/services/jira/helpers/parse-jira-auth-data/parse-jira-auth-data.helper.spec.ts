import { parseJiraAuthData } from './parse-jira-auth-data.helper';

describe('when parseJiraAuthData was called', () => {
  const response = [
    [ '@app:jiraSpaceName', 'mySuperSpaceName' ],
    [ '@app:jiraUserEmail', 'test.von.test@example.com' ],
    [ '@app:token', '1234' ],
  ];

  it('should parse device Storage response to object with correct keys and values', () => {
    const expectedResult = {
      spaceName: 'mySuperSpaceName',
      email: 'test.von.test@example.com',
      token: '1234',
    };

    expect(parseJiraAuthData(response))
      .toEqual(expectedResult);
  });
});
