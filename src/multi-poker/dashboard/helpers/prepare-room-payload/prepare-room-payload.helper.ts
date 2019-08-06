export const prepareRoomPayload = (
  name: string,
  description: string,
  allAdmins: boolean,
) => ({
  name, description, allAdmins,
  users: [],
  discovered: false,
});
