import * as R from 'ramda';
import { RoomsStateModel } from '../../models/room.models';
import {
  DASHBOARD_ACTIONS,
  DashboardActions, SetRoomsAction, SetRoomAction,
  AddRoomAction,
  RemoveRoomAction,
  AddUserAction,
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

const addRoomReducer = (action: AddRoomAction) => R.pipe(
  R.assocPath([ 'models', action.payload.index ], action.payload.room),
)

const removeRoomReducer = (action: RemoveRoomAction) => R.evolve({
  models: R.remove(action.payload, 1),
});

const addUserReducer = (action: AddUserAction) => R.evolve({
  models: R.append(action.payload),
});

const roomsReducers = {
  [DASHBOARD_ACTIONS.SET_ROOMS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.SET_ROOM]: setRoomReducer,
  [DASHBOARD_ACTIONS.ADD_ROOM]: addRoomReducer,
  [DASHBOARD_ACTIONS.ADD_ROOM_SUCCESS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.REMOVE_ROOM]: removeRoomReducer,
  [DASHBOARD_ACTIONS.REMOVE_ROOM_SUCCESS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.ADD_USER]: addUserReducer,
};

const selectReducer = (type: DASHBOARD_ACTIONS, reducers: any): any =>
  reducers[type] || R.always(R.identity);

export function roomsReducer(state = initialState, action: DashboardActions) {
  return selectReducer(action.type, roomsReducers)(action)(state);
}
