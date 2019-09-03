import fetchMock from 'fetch-mock';
import { JiraGet } from './jira-get.service';
import { DEV_ERRORS } from '../../../constants';

describe('JiraGet', () => {
  beforeAll(() => {
    (global as any).Headers = () => {};
  });
  const KEY = 'KEY';
  const auth = {
    email: 'test@example.com',
    spaceName: 'test-space',
    token: '1eifjrwv390rjf',
  };

  describe('when JiraGet.issue was called', () => {
    const mockedResponse = {
      id: '1234',
      key: 'KEY',
    };

    describe('and request succeed', () => {
      beforeEach(() => {
        fetchMock.mock(`end:.atlassian.net/rest/api/3/issue/${KEY}`, mockedResponse)
      });

      it('should return issue with given key', () => {
        return JiraGet(auth).issue(KEY).then(response => {
          expect(response.key)
            .toEqual(KEY);
        });
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });

    describe('and request failed', () => {
      beforeEach(() => {
        fetchMock.mock(`end:.atlassian.net/rest/api/3/issue/${KEY}`, 500)
      });

      it('should throw specific error', () => {
        return expect(JiraGet(auth).issue(KEY)).rejects
          .toThrow(new Error(DEV_ERRORS.jira.issue(auth.spaceName, auth.email, KEY)));
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });
  });

  describe('when JiraGet.project.issues was called', () => {
    const projectKey = 'PROJ';
    const mockedResponse = {
      id: '1234',
      key: 'PROJ',
      issues: [
        { id: '0101' },
      ],
    };

    describe('and request succeed', () => {
      beforeEach(() => {
        fetchMock.mock(`path:/rest/api/2/search`, mockedResponse)
      });

      it('should return issues list from response', () => {
        return JiraGet(auth).project(projectKey).issues().then(response => {
          expect(response)
            .toEqual(mockedResponse.issues);
        });
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });

    describe('and request failed', () => {
      beforeEach(() => {
        fetchMock.mock(`path:/rest/api/2/search`, 500)
      });

      it('should throw specific error', () => {
        return expect(JiraGet(auth).project(projectKey).issues()).rejects
          .toThrow(new Error(DEV_ERRORS.jira.issues(auth.spaceName, projectKey)));
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });
  });

  describe('when JiraGet.projects was called', () => {
    const mockedResponse = {
      values: [
        { id: 'proj-1234' },
      ],
    };

    describe('and request succeed', () => {
      beforeEach(() => {
        fetchMock.mock(`end:.atlassian.net/rest/api/3/project/search`, mockedResponse)
      });

      it('should return issues list from response', () => {
        return JiraGet(auth).projects().then(response => {
          expect(response)
            .toEqual(mockedResponse.values);
        });
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });

    describe('and request failed', () => {
      beforeEach(() => {
        fetchMock.mock(`end:.atlassian.net/rest/api/3/project/search`, 500)
      });

      it('should throw specific error', () => {
        return expect(JiraGet(auth).projects()).rejects
          .toThrow(new Error(DEV_ERRORS.jira.projects(auth.spaceName)));
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });
  });
});
