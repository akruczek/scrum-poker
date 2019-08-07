export enum JIRA_BD_CUSTOM_FIELDS {
  STORY_POINTS = 'customfield_10021',
}

export type JIRA_CUSTOM_FIELD = JIRA_BD_CUSTOM_FIELDS;;

export interface JiraStateModel {
  isPending: boolean;
  success: boolean;
  error: boolean;
}

export interface SetIssueStoryPointsPayload {
  issueKey: string;
  value: number;
}
