export const jiraPusherUpdate = (
  isPending: boolean,
  waiting: boolean,
  isSuccess: boolean,
  isError: boolean,
) => (
  setSuccess: (value: boolean) => void,
  setError: (value: boolean) => void,
  setWaiting: (value: boolean) => void,
  clearJiraStatus: () => void,
  handleClose: () => void,
  handleReset: () => void,
) => {
  if (!isPending && waiting) {
    if (isSuccess) {
      setSuccess(true);
      clearJiraStatus();
      setTimeout(() => {
        setSuccess(false);
        handleClose();
        handleReset();
      }, 2000);
    }

    if (isError) {
      setError(true);
      clearJiraStatus();
      setWaiting(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }
};
