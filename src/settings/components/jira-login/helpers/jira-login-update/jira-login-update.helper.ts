export const jiraLoginUpdate = (
  allFieldsFilled: boolean,
  waiting: boolean,
  displaySuccess: boolean,
  displayError: boolean,
  isPending: boolean,
  isUser: boolean,
) => (
  setSuccess: (value: boolean) => void,
  setError: (value: boolean) => void,
  setWaiting: (value: boolean) => void,
  handleClose: () => void,
  clearJiraStatus: () => void,
) => {
  if (allFieldsFilled && waiting && !isPending && !displaySuccess && !displayError) {
    if (isUser) {
      setSuccess(true);
      clearJiraStatus();
      setWaiting(false);
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 2000);
    }

    if (!isUser) {
      setError(true);
      clearJiraStatus();
      setWaiting(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }
};
