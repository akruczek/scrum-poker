export const getListedUserIcon = (
  isValuePresent: boolean,
  isRoomDiscovered: boolean,
  isCurrentUser: boolean,
) => !isValuePresent ? 'live-help' : (!isRoomDiscovered && !isCurrentUser && 'check' || 'help');
