import { parseJiraConfigurationData } from './parse-jira-configuration-data.helper';

describe('when parseJiraConfigurationData was called', () => {
  const response = [
    [ '@app:jiraProjectCustomField', 'STORY points' ],
  ];

  it('should parse device Storage response to object with correct keys and values', () => {
    const expectedResult = {
      customField: 'STORY points',
    };

    expect(parseJiraConfigurationData(response))
      .toEqual(expectedResult);
  });
});
