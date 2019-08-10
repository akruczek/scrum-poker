export enum JIRA_BD_CUSTOM_FIELDS {
  STORY_POINTS = 'customfield_10021',
}

export type JIRA_CUSTOM_FIELD = JIRA_BD_CUSTOM_FIELDS;;

export interface JiraStateModel {
  isPending: boolean;
  success: boolean;
  error: boolean;
  auth: JiraAuthModel | null;
  user: JiraUserModel | null;
}

export interface JiraAuthModel {
  spaceName: string;
  email: string;
  token: string;
}

export interface SetIssueStoryPointsPayload {
  issueKey: string;
  value: number;
}

export interface JiraUserModel {
  accountId: string;
  avatarUrl: string;
  displayName: string;
}
