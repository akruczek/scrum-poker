import { Action } from 'redux';
import { PokerCard, RoomModel, UserModel } from '@core/models';
import { newAction } from '@core/helpers';

export enum DASHBOARD_ACTIONS {
  SET_ROOMS = '[Dashboard]: Set rooms',
  SET_ROOM = '[Dashboard]: Set room',
  ADD_ROOM = '[Dashboard]: Add room',
  ADD_ROOM_SUCCESS = '[Dashboard]: Add room success',
  ADD_ROOM_ERROR = '[Dashboard]: Add room error',
  REMOVE_ROOM = '[Dashboard]: Remove room',
  REMOVE_ROOM_SUCCESS = '[Dashboard]: Remove room success',
  REMOVE_ROOM_ERROR = '[Dashboard]: Remove room error',
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

export interface SetRoomsAction extends Action {
  payload: RoomModel[];
}

export interface SetRoomAction extends Action {
  payload: RoomModel;
}

export interface AddRoomAction extends Action {
  payload: RoomModel;
}

export interface AddRoomSuccessAction extends Action {
  payload: RoomModel[];
}

export interface RemoveRoomAction extends Action {
  payload: string;
}

export interface RemoveRoomSuccessAction extends Action {
  payload: {[key: string]: RoomModel};
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

export type DashboardActions =
  SetRoomsAction &
  SetRoomAction &
  AddRoomAction &
  AddRoomSuccessAction &
  AddUserAction &
  AddUserSuccessAction &
  RemoveRoomAction &
  RemoveRoomSuccessAction &
  RoomAction &
  SetValueAction;

export const setRooms = newAction<DASHBOARD_ACTIONS, RoomModel[]>(DASHBOARD_ACTIONS.SET_ROOMS);
export const setRoom = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.SET_ROOM);

export const addRoom = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.ADD_ROOM);
export const addRoomSuccess = newAction<DASHBOARD_ACTIONS, RoomModel[]>(DASHBOARD_ACTIONS.ADD_ROOM_SUCCESS);
export const addRoomError = newAction<DASHBOARD_ACTIONS, any>(DASHBOARD_ACTIONS.ADD_ROOM_ERROR);

export const removeRoom = newAction<DASHBOARD_ACTIONS, string>(DASHBOARD_ACTIONS.REMOVE_ROOM);
export const removeRoomSuccess = newAction<DASHBOARD_ACTIONS, RoomModel[]>(DASHBOARD_ACTIONS.REMOVE_ROOM_SUCCESS);
export const removeRoomError = newAction<DASHBOARD_ACTIONS, any>(DASHBOARD_ACTIONS.REMOVE_ROOM_ERROR);

export const addUser = newAction<DASHBOARD_ACTIONS, AddUserPayload>(DASHBOARD_ACTIONS.ADD_USER);
export const addUserSuccess = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.ADD_USER_SUCCESS);
export const addUserError = newAction<DASHBOARD_ACTIONS, UserModel>(DASHBOARD_ACTIONS.ADD_USER_ERROR);

export const showDown = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.SHOW_DOWN);
export const showDownSuccess = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.SHOW_DOWN_SUCCESS);
export const showDownError = newAction<DASHBOARD_ACTIONS, any>(DASHBOARD_ACTIONS.SHOW_DOWN_ERROR);

export const reset = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.RESET);
export const resetSuccess = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.RESET_SUCCESS);
export const resetError = newAction<DASHBOARD_ACTIONS, any>(DASHBOARD_ACTIONS.RESET_ERROR);

export const setValue = newAction<DASHBOARD_ACTIONS, SetValuePayload>(DASHBOARD_ACTIONS.SET_VALUE);
export const setValueSuccess = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.SET_VALUE_SUCCESS);
export const setValueError = newAction<DASHBOARD_ACTIONS, any>(DASHBOARD_ACTIONS.SET_VALUE_ERROR);

export const updateRoom = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.UPDATE_ROOM);
export const updateRoomSuccess = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.UPDATE_ROOM_SUCCESS);
export const updateRoomError = newAction<DASHBOARD_ACTIONS, any>(DASHBOARD_ACTIONS.UPDATE_ROOM_ERROR);
