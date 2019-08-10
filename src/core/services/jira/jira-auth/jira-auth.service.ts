import { JiraAuthModel } from '../../../models';
import { encodeBasicAuthorization } from '../../../helpers';

export const JiraAuth = (payload: JiraAuthModel) =>
  fetch(`https://${payload.spaceName}.atlassian.net/rest/api/3/myself`, {
    method: 'GET',
    headers: new Headers({
      Authorization: encodeBasicAuthorization(payload.email, payload.token),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  });
