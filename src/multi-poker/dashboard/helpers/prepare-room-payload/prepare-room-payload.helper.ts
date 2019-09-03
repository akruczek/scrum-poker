import { PokerModel } from '@core/models';

export const prepareRoomPayload = (
  name: string,
  description: string,
  projectKey: string,
  allAdmins: boolean,
  poker: PokerModel,
  customField: string,
  defaultIssueType: string,
  defaultIssueStatus: string,
) => ({
  name, description, allAdmins, poker, projectKey,
  customField, defaultIssueType, defaultIssueStatus,
  users: [],
  discovered: false,
});
