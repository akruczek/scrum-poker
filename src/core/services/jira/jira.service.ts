import { JiraGet } from './jira-get/jira-get.service';
import { JiraPut } from './jira-put/jira-put.service';

class _Jira {
  public get = new JiraGet();
  public put = new JiraPut();
};

export const Jira = new _Jira();
