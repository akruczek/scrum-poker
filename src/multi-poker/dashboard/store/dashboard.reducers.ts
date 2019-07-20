import * as R from 'ramda';
import { RoomsStateModel } from '../../models/room.models';
import {
  DASHBOARD_ACTIONS, DashboardActions, SetRoomsAction, SetRoomAction,
} from './dashboard.actions';

const initialState: RoomsStateModel = {
  models: [],
  model: {},
};

const setRoomsReducer = (action: SetRoomsAction) => R.pipe(
  R.assoc('models', action.payload),
);

const setRoomReducer = (action: SetRoomAction) => R.pipe(
  R.assoc('model', action.payload),
);

const roomsReducers = {
  [DASHBOARD_ACTIONS.SET_ROOMS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.SET_ROOM]: setRoomReducer,
};

const selectReducer = (type: DASHBOARD_ACTIONS, reducers: any): any =>
  reducers[type] || R.always(R.identity);

export function roomsReducer(state = initialState, action: DashboardActions) {
  return selectReducer(action.type, roomsReducers)(action)(state);
}
