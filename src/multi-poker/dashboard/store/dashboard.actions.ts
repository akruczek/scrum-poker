import { Action } from 'redux';
import { UserModel } from '../../../core/models/auth.models';
import { RoomModel } from '../../models/room.models';

export enum DASHBOARD_ACTIONS {
  SET_ROOMS = '[Dashboard]: Set rooms',
  SET_ROOM = '[Dashboard]: Set room',
}

export interface SetRoomsAction extends Action {
  payload: RoomModel[];
}

export interface SetRoomAction extends Action {
  payload: RoomModel;
}

export type DashboardActions = SetRoomsAction & SetRoomAction;

const newAction = <P>(type: DASHBOARD_ACTIONS) =>
  (payload?: P): { type: DASHBOARD_ACTIONS, payload?: P } => ({ type, payload });

export const setRooms = newAction<RoomModel[]>(DASHBOARD_ACTIONS.SET_ROOMS);

export const setRoom = newAction<RoomModel>(DASHBOARD_ACTIONS.SET_ROOM);
