import { PokerModel } from '../../../../core/models';

export const prepareRoomPayload = (
  name: string,
  description: string,
  projectKey: string,
  allAdmins: boolean,
  poker: PokerModel,
) => ({
  name, description, allAdmins, poker, projectKey,
  users: [],
  discovered: false,
});
