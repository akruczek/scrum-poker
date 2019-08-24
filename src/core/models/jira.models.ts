export interface JiraStateModel {
  isPending: boolean;
  success: boolean;
  error: boolean;
  auth: JiraAuthModel | null;
  user: JiraUserModel | null;
  configuration: JiraConfigurationModel | null;
  projects: JiraProjectModel[] | null;
  issues: JiraIssueModel[] | null;
}

export interface JiraConfigurationModel {
  customField: string;
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

export interface JiraProjectModel {
  id: string;
  key: string;
  avatarUrl: string;
  displayName: string;
}

export interface JiraIssueModel {
  id: string;
  key: string;
  createdAt: string;
  summary: string;
  status: string;
  issueType: string;
}
