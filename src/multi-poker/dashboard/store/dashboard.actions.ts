import { Action } from 'redux';
import { RoomModel } from '../../models/room.models';
import { UserModel } from '../../../core/models/auth.models';

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
}

export interface SetRoomsAction extends Action {
  payload: RoomModel[];
}

export interface SetRoomAction extends Action {
  payload: RoomModel;
}

export interface AddRoomAction extends Action {
  payload: {
    index: number;
    room: RoomModel;
  };
}

export interface AddRoomSuccessAction extends Action {
  payload: RoomModel[];
}

export interface RemoveRoomAction extends Action {
  payload: number;
}

export interface RemoveRoomSuccessAction extends Action {
  payload: RoomModel[];
}

export interface AddUserPayload {
  user: UserModel;
  index: number;
  roomIndex: number;
}

export interface AddUserAction extends Action {
  payload: AddUserPayload;
}

export interface AddUserSuccessAction extends Action {
  payload: RoomModel;
}

export type DashboardActions =
  SetRoomsAction &
  SetRoomAction &
  AddRoomAction &
  AddRoomSuccessAction &
  AddUserAction &
  AddUserSuccessAction &
  RemoveRoomAction &
  RemoveRoomSuccessAction;

const newAction = <P>(type: DASHBOARD_ACTIONS) =>
  (payload?: P): { type: DASHBOARD_ACTIONS, payload?: P } => ({ type, payload });

export const setRooms = newAction<RoomModel[]>(DASHBOARD_ACTIONS.SET_ROOMS);
export const setRoom = newAction<RoomModel>(DASHBOARD_ACTIONS.SET_ROOM);

export const addRoom = newAction<{ room: RoomModel, index: number }>(DASHBOARD_ACTIONS.ADD_ROOM);
export const addRoomSuccess = newAction<RoomModel[]>(DASHBOARD_ACTIONS.ADD_ROOM_SUCCESS);
export const addRoomError = newAction<any>(DASHBOARD_ACTIONS.ADD_ROOM_ERROR);

export const removeRoom = newAction<number>(DASHBOARD_ACTIONS.REMOVE_ROOM);
export const removeRoomSuccess = newAction<RoomModel[]>(DASHBOARD_ACTIONS.REMOVE_ROOM_SUCCESS);
export const removeRoomError = newAction<any>(DASHBOARD_ACTIONS.REMOVE_ROOM_ERROR);

export const addUser = newAction<AddUserPayload>(DASHBOARD_ACTIONS.ADD_USER);
export const addUserSuccess = newAction<RoomModel>(DASHBOARD_ACTIONS.ADD_USER_SUCCESS);
export const addUserError = newAction<UserModel>(DASHBOARD_ACTIONS.ADD_USER_ERROR);
