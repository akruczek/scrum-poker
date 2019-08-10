import { encodeBasicAuthorization } from '../../../helpers/encode-basic-authorization/encode-basic-authorization.helper';
import { JIRA_CUSTOM_FIELD, JiraAuthModel } from '../../../models';

export const JiraPut = ({ email, token, spaceName }: JiraAuthModel) => ({
  issue: (key: string) => ({
    property: (prop: JIRA_CUSTOM_FIELD) => ({
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
        }),
    }),
  }),
});
