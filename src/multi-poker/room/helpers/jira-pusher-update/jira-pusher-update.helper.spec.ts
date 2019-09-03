import { jiraPusherUpdate } from './jira-pusher-update.helper';

jest.setTimeout(6000);

describe('when jiraPusherUpdate was called', () => {
  const setSuccess = jest.fn();
  const setError = jest.fn();
  const setWaiting = jest.fn();
  const clearJiraStatus = jest.fn();
  const handleClose = jest.fn();
  const handleReset = jest.fn();

  describe('and "isPending" equals true or "waiting" equals false', () => {
    const isPending = true;
    const waiting = false;
    const isError = false;
    const isSuccess = false;

    beforeAll(() => {
      jiraPusherUpdate(isPending, waiting, isSuccess, isError)(
        setSuccess, setError, setWaiting, clearJiraStatus, handleClose, handleReset,
      );
    });

    it('should do nothing', () => {
      expect(setSuccess)
        .not.toHaveBeenCalled();
      expect(setError)
        .not.toHaveBeenCalled();
    });
  });

  describe('and "isPending" equals false and "waiting" equals true', () => {
    const isPending = false;
    const waiting = true;

    describe('and "isSuccess" equals true', () => {
      const isSuccess = true;
      const isError = false;

      beforeAll(() => {
        jiraPusherUpdate(isPending, waiting, isSuccess, isError)(
          setSuccess, setError, setWaiting, clearJiraStatus, handleClose, handleReset,
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
    });

    describe('and "isError" equals true', () => {
      const isError = true;
      const isSuccess = false;

      beforeAll(() => {
        jiraPusherUpdate(isPending, waiting, isSuccess, isError)(
          setSuccess, setError, setWaiting, clearJiraStatus, handleClose, handleReset,
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
        }, 3001)
      })
    });
  });
});
