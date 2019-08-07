import { encodeBasicAuthorization } from '../../../helpers/encode-basic-authorization/encode-basic-authorization.helper';
import env from '../../../constants/env';

export class JiraGet {
  private authorization = encodeBasicAuthorization(env.JIRA_EMAIL, env.JIRA_TOKEN);

  public issue(key: string) {
    return fetch(`${env.JIRA_URL}/rest/api/3/issue/${key}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: this.authorization,
        'Content-Type': 'application/json',
      }),
    });
  }
}
