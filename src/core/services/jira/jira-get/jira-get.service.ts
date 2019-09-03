import { encodeBasicAuthorization } from '../../../helpers';
import { JiraAuthModel } from '../../../models';
import { catchResponse } from '../../../helpers';
import { DEV_ERRORS } from '../../../constants';

export const JiraGet = ({ email, token, spaceName }: JiraAuthModel) => ({
  issue: (key: string) =>
    fetch(`https://${spaceName}.atlassian.net/rest/api/3/issue/${key}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: encodeBasicAuthorization(email, token),
        'Content-Type': 'application/json',
      }),
    })
    .then(catchResponse(DEV_ERRORS.jira.issue(spaceName, email, key))),

  project: (key: string) => ({
    issues: (maxResults?: number) =>
      fetch(`https://${spaceName}.atlassian.net/rest/api/2/search?jql=project=${key}&maxResults=${maxResults || 100}`, {
        method: 'GET',
        headers: new Headers({
          Authorization: encodeBasicAuthorization(email, token),
          'Content-Type': 'application/json',
        }),
      })
      .then(catchResponse(DEV_ERRORS.jira.issues(spaceName, key)))
      .then(response => response.issues),
  }),

  projects: () =>
    fetch(`https://${spaceName}.atlassian.net/rest/api/3/project/search`, {
      method: 'GET',
      headers: new Headers({
        Authorization: encodeBasicAuthorization(email, token),
        'Content-Type': 'application/json',
      }),
    })
    .then(catchResponse(DEV_ERRORS.jira.projects(spaceName)))
    .then(response => response.values),
});
