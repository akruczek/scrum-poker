import { JIRA_URL, JIRA_EMAIL, JIRA_TOKEN } from 'react-native-dotenv';
import { encodeBasicAuthorization } from '../../../helpers/encode-basic-authorization/encode-basic-authorization.helper';

export class JiraGet {
  private authorization = encodeBasicAuthorization(JIRA_EMAIL, JIRA_TOKEN);

  public issue(key: string) {
    return fetch(`${JIRA_URL}/rest/api/3/issue/${key}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: this.authorization,
        'Content-Type': 'application/json',
      }),
    });
  }
}
