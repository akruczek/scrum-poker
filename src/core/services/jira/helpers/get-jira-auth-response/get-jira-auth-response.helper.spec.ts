import { getJiraAuthResponse } from './get-jira-auth-response.helper';

describe('when getJiraAuthResponse was called', () => {
  const response = {
    accountId: 'some-uuid',
    displayName: 'Test von Test',
    avatarUrls: {
      '32x32': 'url-to-32x32-avatar',
      '48x48': 'url-to-48x48-avatar',
    },
  };

  it('should pick from response "accountId", "displayName" and last avatarUrl', () => {
    const expectedResult = {
      accountId: 'some-uuid',
      displayName: 'Test von Test',
      avatarUrl: 'url-to-48x48-avatar',
    };

    expect(getJiraAuthResponse(response))
      .toEqual(expectedResult);
  });
});
