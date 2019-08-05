export const prepareRoomPayload = (name: string, description: string) => ({
  name, description,
  users: [],
  discovered: false,
});
