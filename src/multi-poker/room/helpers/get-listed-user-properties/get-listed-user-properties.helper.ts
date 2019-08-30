import * as R from 'ramda';
import { isPresent } from '@core/helpers';
import { UserModel, RoomModel } from '@core/models';
import { getListedUserIcon } from '../get-listed-user-icon/get-listed-user-icon.helper';

type ReturnType = [
  boolean, boolean, boolean, string,
];

export const getListedUserProperties = (
  room: RoomModel,
  user: UserModel,
  email: string,
): ReturnType => {
  const isValuePresent = isPresent(user.selectedValue);
  const isRoomDiscovered: boolean = R.propOr(false, 'discovered', room);
  const isCurrentUser = R.propEq('email', email, user);
  const icon = getListedUserIcon(isValuePresent, isRoomDiscovered, isCurrentUser);

  return [ isValuePresent, isRoomDiscovered, isCurrentUser, icon ];
};