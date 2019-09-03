import { encodeBasicAuthorization } from '../../../helpers';
import { JiraAuthModel } from '../../../models';
import { catchResponse } from '../../../helpers';
import { DEV_ERRORS } from '../../../constants';

export const JiraPut = ({ email, token, spaceName }: JiraAuthModel) => ({
  issue: (key: string) => ({
    property: (prop: string) => ({
      set: (value: number) =>
        fetch(`https://${spaceName}.atlassian.net/rest/api/2/issue/${key}`, {
          method: 'PUT',
          headers: new Headers({
            Authorization: encodeBasicAuthorization(email, token),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
          body: JSON.stringify({
            update: {
              [prop]: [{ set: value }],
            },
          }),
        })
        .then(catchResponse(DEV_ERRORS.jira.setIssue(spaceName, email, key, prop), true)),
    }),
  }),
});
