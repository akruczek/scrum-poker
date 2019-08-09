import { PokerModel } from '../../../../core/models';

export const prepareRoomPayload = (
  name: string,
  description: string,
  allAdmins: boolean,
  poker: PokerModel,
) => ({
  name, description, allAdmins, poker,
  users: [],
  discovered: false,
});
