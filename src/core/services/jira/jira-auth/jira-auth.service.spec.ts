import fetchMock from 'fetch-mock';
import { JiraAuth } from './jira-auth.service';
import { DEV_ERRORS } from '../../../constants';

describe('JiraAuth', () => {
  const mockedResponse = {
    avatarUrls: {
      '42x42': 'some-url-to-avatar',
    },
    accountId: '1234',
    displayName: 'Text von Test',
  };

  const payload = {
    spaceName: 'space-name',
    email: 'test@example.com',
    token: '1234abcd1234',
  };

  describe('when JiraAuth was called', () => {
    beforeAll(() => {
      (global as any).Headers = () => {};
    });

    describe('and request succeeded', () => {
      beforeEach(() => {
        fetchMock.mock('end:.atlassian.net/rest/api/3/myself', mockedResponse);
      });
  
      it('should return parsed response', () => {
        const expectedResponse = {
          avatarUrl: 'some-url-to-avatar',
          accountId: '1234',
          displayName: 'Text von Test',
        };
  
        return JiraAuth(payload).then(response => {
          expect(response)
            .toEqual(expectedResponse);
        });
      });
  
      afterEach(() => {
        fetchMock.reset();
      });
    });

    describe('and request failed', () => {
      beforeEach(() => {
        fetchMock.mock('end:.atlassian.net/rest/api/3/myself', 500);
      });

      it('should throw specific error', () => {
        return expect(JiraAuth(payload)).rejects.toThrow(new Error(DEV_ERRORS.jira.myself));
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });
  });
});
