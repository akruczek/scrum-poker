import { encodeBasicAuthorization } from '../../../helpers/encode-basic-authorization/encode-basic-authorization.helper';
import { JiraAuthModel } from '../../../models';

export const JiraGet = ({ email, token, spaceName }: JiraAuthModel) => ({
  issue: (key: string) =>
    fetch(`https://${spaceName}.atlassian.net/rest/api/3/issue/${key}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: encodeBasicAuthorization(email, token),
        'Content-Type': 'application/json',
      }),
    }),

  projects: () =>
    fetch(`https://${spaceName}.atlassian.net/rest/api/3/project/search`, {
      method: 'GET',
      headers: new Headers({
        Authorization: encodeBasicAuthorization(email, token),
        'Content-Type': 'application/json',
      }),
    })
    .then(response => response
      .json()
      .then(data => data.values)),
});
