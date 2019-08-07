import { encodeBasicAuthorization } from '../../../helpers/encode-basic-authorization/encode-basic-authorization.helper';
import { JIRA_CUSTOM_FIELD } from '../../../models';
import env from '../../../constants/env';

export class JiraPut {
  private authorization = encodeBasicAuthorization(env.JIRA_EMAIL, env.JIRA_TOKEN);

  public issue(key: string) {
    return {
      property: (prop: JIRA_CUSTOM_FIELD) => ({
        set: (value: number) => fetch(`${env.JIRA_URL}/rest/api/2/issue/${key}`, {
          method: 'PUT',
          headers: new Headers({
            Authorization: this.authorization,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
          body: JSON.stringify({
            update: {
              [prop]: [{ set: value }],
            },
          }),
        })
        .then(v => v),
      })
    };
  }
}
