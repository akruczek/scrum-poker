import { JiraGet } from './jira-get/jira-get.service';

class _Jira {
  public get = new JiraGet();
};

export const Jira = new _Jira();
