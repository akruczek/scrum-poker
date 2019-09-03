import { JiraAuthModel } from '../../../models';
import { encodeBasicAuthorization } from '../../../helpers';
import { DEV_ERRORS } from '../../../constants';
import { getJiraAuthResponse } from '../helpers/get-jira-auth-response/get-jira-auth-response.helper';

export const JiraAuth = (payload: JiraAuthModel) =>
  fetch(`https://${payload.spaceName}.atlassian.net/rest/api/3/myself`, {
    method: 'GET',
    headers: new Headers({
      Authorization: encodeBasicAuthorization(payload.email, payload.token),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  })
  .then(async response => {
    if (response.ok) {
      const data = await response.json();
      return getJiraAuthResponse(data);
    } else {
      throw Error(DEV_ERRORS.jira.myself(payload.spaceName));
    }
  });
