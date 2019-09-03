import fetchMock from 'fetch-mock';
import { JiraPut } from './jira-put.service';
import { DEV_ERRORS } from '../../../constants';

describe('JiraPut', () => {
  beforeAll(() => {
    (global as any).Headers = () => {};
  });

  const auth = {
    email: 'test@example.com',
    token: 'token',
    spaceName: 'SPACE',
  }

  const key = 'KEY';

  const prop = 'story_points';

  describe('when JiraPut.issue.property.set was called', () => {
    const mockedResponse = { key };

    describe('and request succeed', () => {
      beforeEach(() => {
        fetchMock.mock(`end:.atlassian.net/rest/api/2/issue/${key}`, mockedResponse)
      });
      
      it('should return specific response', () => {
        return JiraPut(auth).issue(key).property(prop).set(10).then(response => {
          expect(response).toEqual(mockedResponse);
        });
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });

    describe('and request failed', () => {
      beforeEach(() => {
        fetchMock.mock(`end:.atlassian.net/rest/api/2/issue/${key}`, 500)
      });
      
      it('should throw specific error', () => {
        return expect(JiraPut(auth).issue(key).property(prop).set(10)).rejects
          .toThrow(new Error(DEV_ERRORS.jira.setIssue(auth.spaceName, auth.email, key, prop)));
      });

      afterEach(() => {
        fetchMock.reset();
      });
    });
  });
});
