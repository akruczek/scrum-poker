import { Action } from 'redux';
import { RoomModel } from '@core/models';
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

export type DashboardActions =
  SetRoomsAction &
  SetRoomAction &
  AddRoomAction &
  AddRoomSuccessAction &
  RemoveRoomAction &
  RemoveRoomSuccessAction;

export const setRooms = newAction<DASHBOARD_ACTIONS, RoomModel[]>(DASHBOARD_ACTIONS.SET_ROOMS);
export const setRoom = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.SET_ROOM);

export const addRoom = newAction<DASHBOARD_ACTIONS, RoomModel>(DASHBOARD_ACTIONS.ADD_ROOM);
export const addRoomSuccess = newAction<DASHBOARD_ACTIONS, RoomModel[]>(DASHBOARD_ACTIONS.ADD_ROOM_SUCCESS);
export const addRoomError = newAction<DASHBOARD_ACTIONS, any>(DASHBOARD_ACTIONS.ADD_ROOM_ERROR);

export const removeRoom = newAction<DASHBOARD_ACTIONS, string>(DASHBOARD_ACTIONS.REMOVE_ROOM);
export const removeRoomSuccess = newAction<DASHBOARD_ACTIONS, RoomModel[]>(DASHBOARD_ACTIONS.REMOVE_ROOM_SUCCESS);
export const removeRoomError = newAction<DASHBOARD_ACTIONS, any>(DASHBOARD_ACTIONS.REMOVE_ROOM_ERROR);
