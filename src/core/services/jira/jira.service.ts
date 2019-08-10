import { JiraGet } from './jira-get/jira-get.service';
import { JiraPut } from './jira-put/jira-put.service';
import { JiraAuth } from './jira-auth/jira-auth.service';

export const Jira = {
  get: JiraGet,
  put: JiraPut,
  auth: JiraAuth,
};
