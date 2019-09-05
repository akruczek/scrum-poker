import { Action } from 'redux';
import { PokerCard, RoomModel, UserModel } from '@core/models';
import { newAction } from '@core/helpers';

export enum ROOM_ACTIONS {
  ADD_USER = '[Room]: Add user',
  ADD_USER_SUCCESS = '[Room]: Add user success',
  ADD_USER_ERROR = '[Room]: Add user error',
  SHOW_DOWN = '[Room]: Show down',
  SHOW_DOWN_SUCCESS = '[Room]: Show down success',
  SHOW_DOWN_ERROR = '[Room]: Show down error',
  RESET = '[Room]: Reset',
  RESET_SUCCESS = '[Room]: Reset success',
  RESET_ERROR = '[Room]: Reset error',
  SET_VALUE = '[Room]: Set value',
  SET_VALUE_SUCCESS = '[Room]: Set value success',
  SET_VALUE_ERROR = '[Room]: Set value error',
  UPDATE_ROOM = '[Room]: Update room',
  UPDATE_ROOM_SUCCESS = '[Room]: Update room success',
  UPDATE_ROOM_ERROR = '[Room]: Update room error',
}

export interface AddUserPayload {
  user: UserModel;
  roomId: string;
}

export interface AddUserAction extends Action {
  payload: AddUserPayload;
}

export interface AddUserSuccessAction extends Action {
  payload: RoomModel;
}

export interface RoomAction extends Action {
  payload: RoomModel;
}

export interface SetValuePayload {
  roomId: string;
  userId: string;
  value: PokerCard;
}

export interface SetValueAction extends Action {
  payload: SetValuePayload;
}

export type RoomActions =
  AddUserAction &
  AddUserSuccessAction &
  RoomAction &
  SetValueAction;

export const addUser = newAction<ROOM_ACTIONS, AddUserPayload>(ROOM_ACTIONS.ADD_USER);
export const addUserSuccess = newAction<ROOM_ACTIONS, RoomModel>(ROOM_ACTIONS.ADD_USER_SUCCESS);
export const addUserError = newAction<ROOM_ACTIONS, UserModel>(ROOM_ACTIONS.ADD_USER_ERROR);

export const showDown = newAction<ROOM_ACTIONS, RoomModel>(ROOM_ACTIONS.SHOW_DOWN);
export const showDownSuccess = newAction<ROOM_ACTIONS, RoomModel>(ROOM_ACTIONS.SHOW_DOWN_SUCCESS);
export const showDownError = newAction<ROOM_ACTIONS, any>(ROOM_ACTIONS.SHOW_DOWN_ERROR);

export const reset = newAction<ROOM_ACTIONS, RoomModel>(ROOM_ACTIONS.RESET);
export const resetSuccess = newAction<ROOM_ACTIONS, RoomModel>(ROOM_ACTIONS.RESET_SUCCESS);
export const resetError = newAction<ROOM_ACTIONS, any>(ROOM_ACTIONS.RESET_ERROR);

export const setValue = newAction<ROOM_ACTIONS, SetValuePayload>(ROOM_ACTIONS.SET_VALUE);
export const setValueSuccess = newAction<ROOM_ACTIONS, RoomModel>(ROOM_ACTIONS.SET_VALUE_SUCCESS);
export const setValueError = newAction<ROOM_ACTIONS, any>(ROOM_ACTIONS.SET_VALUE_ERROR);

export const updateRoom = newAction<ROOM_ACTIONS, RoomModel>(ROOM_ACTIONS.UPDATE_ROOM);
export const updateRoomSuccess = newAction<ROOM_ACTIONS, RoomModel>(ROOM_ACTIONS.UPDATE_ROOM_SUCCESS);
export const updateRoomError = newAction<ROOM_ACTIONS, any>(ROOM_ACTIONS.UPDATE_ROOM_ERROR);
