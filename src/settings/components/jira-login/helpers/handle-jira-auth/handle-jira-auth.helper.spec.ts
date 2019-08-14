import { handleJiraAuth } from './handle-jira-auth.helper';

describe('when handleJiraAuth was called', () => {
  const authJira = jest.fn();
  const setWaiting = jest.fn();

  describe('and allFieldsFilled equals "false"', () => {
    const allFieldsFilled = false;

    beforeAll(() => {
      handleJiraAuth(allFieldsFilled)('space', 'x@x.x', 'token')(authJira, setWaiting);
    });

    it('should not call any of given functions', () => {
      expect(authJira)
        .not.toHaveBeenCalled();
      expect(setWaiting)
        .not.toHaveBeenCalled();
    });
  });

  describe('and allFieldsFilled equals "true"', () => {
    const allFieldsFilled = true;

    beforeAll(() => {
      handleJiraAuth(allFieldsFilled)('space', 'x@x.x', 'token')(authJira, setWaiting);
    });

    it('should call authJira with given Jira payload values', () => {
      expect(authJira)
        .toHaveBeenCalledWith({ spaceName: 'space', email: 'x@x.x', token: 'token' });
    });

    it('should call setWaiting with "true"', () => {
      expect(setWaiting)
        .toHaveBeenCalledWith(true);
    });
  });
});
