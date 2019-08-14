import { JiraAuthModel } from '@core/models';

export const handleJiraAuth = (
  allFieldsFilled: boolean,
) => (
  spaceName: string,
  email: string,
  token: string,
) => (
  authJira: (payload: JiraAuthModel) => void,
  setWaiting: (value: boolean) => void,
) => {
  if (allFieldsFilled) {
    authJira({ spaceName, email, token });
    setWaiting(true);
  }
}