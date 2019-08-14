import { jiraLoginUpdate } from './jira-login-update.helper';

jest.setTimeout(6000);

describe('when jiraLoginUpdate was called', () => {
  const setSuccess = jest.fn();
  const setError = jest.fn();
  const setWaiting = jest.fn();
  const handleClose = jest.fn();
  const clearJiraStatus = jest.fn();

  describe('and allFieldsFilled equals true', () => {
    const allFieldsFilled = true;

    describe('and waiting equals true', () => {
      const waiting = true;

      describe('and isPending equals false', () => {
        const isPending = false;

        describe('and displaySuccess equals false', () => {
          const displaySuccess = false;

          describe('and displayError equals false', () => {
            const displayError = false;

            describe('and isUser equals true', () => {
              const isUser = true;

              beforeAll(() => {
                jiraLoginUpdate(allFieldsFilled, waiting, displaySuccess, displayError, isPending, isUser)(
                  setSuccess, setError, setWaiting, handleClose, clearJiraStatus,
                );
              });
              
              it('should call setSuccess with "true"', () => {
                expect(setSuccess)
                  .toHaveBeenCalledWith(true);
              });

              it('should call clearJiraStatus', () => {
                expect(clearJiraStatus)
                  .toHaveBeenCalled();
              });

              it('should call setWaiting with "false"', () => {
                expect(setWaiting)
                  .toHaveBeenCalledWith(false);
              });

              it('should call setSuccess with false and handleClose after 2000ms', done => {
                setTimeout(() => {
                  expect(setSuccess)
                    .toHaveBeenCalledWith(false);
                  expect(handleClose)
                    .toHaveBeenCalled();
                  done();
                }, 2001);
              });
            });

            describe('and isUser equals false', () => {
              const isUser = false;

              beforeAll(() => {
                jiraLoginUpdate(allFieldsFilled, waiting, displaySuccess, displayError, isPending, isUser)(
                  setSuccess, setError, setWaiting, handleClose, clearJiraStatus,
                );
              });

              it('should call setError with "true"', () => {
                expect(setError)
                  .toHaveBeenCalledWith(true);
              });

              it('should call clearJiraStatus', () => {
                expect(clearJiraStatus)
                  .toHaveBeenCalled();
              });

              it('should call setWaiting with "false"', () => {
                expect(setWaiting)
                  .toHaveBeenCalledWith(false);
              });

              it('should call setError with "false" after 3000ms', done => {
                setTimeout(() => {
                  expect(setError)
                    .toHaveBeenCalledWith(false);
                  done();
                }, 3001);
              });
            });
          });
        });
      });
    });
  });
});
