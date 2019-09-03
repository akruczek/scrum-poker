export const DEV_ERRORS = {
  jira: {
    myself: (spaceName: string) =>
      `${spaceName}: Cannot get JIRA user. ".../rest/api/3/myself" failed.`,
    issue: (spaceName: string, email: string, key: string) =>
      `${spaceName}: User ${email} cannot get ${key} JIRA issue`,
    issues: (spaceName: string, projectKey: string) =>
      `${spaceName}: Cannot get ${projectKey} JIRA project issues`,
    projects: (spaceName: string) =>
      `${spaceName}: Cannot get JIRA projects list`,
    setIssue: (spaceName: string, email: string, key: string, prop: string) =>
      `${spaceName}: User ${email} Cannot set ${key} JIRA issue ${prop} property`,
  },
};

export enum ERRORS {

}
