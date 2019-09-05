import * as R from 'ramda';
import { RoomsStateModel } from '@core/models';
import { selectReducer } from '@core/helpers';
import {
  DASHBOARD_ACTIONS, DashboardActions, SetRoomsAction, SetRoomAction, AddRoomAction, RemoveRoomAction
} from './dashboard.actions';

const initialState: RoomsStateModel = {
  models: {},
  model: {},
};

const setRoomsReducer = (action: SetRoomsAction) => R.pipe(
  R.assoc('models', R.values(action.payload)),
);

const setRoomReducer = (action: SetRoomAction) => R.pipe(
  R.assoc('model', action.payload),
);

const addRoomReducer = (action: AddRoomAction) => R.pipe(
  R.assocPath([ 'models', action.payload.id ], action.payload),
)

const removeRoomReducer = (action: RemoveRoomAction) => R.evolve({
  models: R.remove(Number(action.payload), 1),
});

export const dashboardReducers = {
  [DASHBOARD_ACTIONS.SET_ROOMS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.SET_ROOM]: setRoomReducer,
  [DASHBOARD_ACTIONS.ADD_ROOM]: addRoomReducer,
  [DASHBOARD_ACTIONS.ADD_ROOM_SUCCESS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.REMOVE_ROOM]: removeRoomReducer,
  [DASHBOARD_ACTIONS.REMOVE_ROOM_SUCCESS]: setRoomsReducer,
};

export const dashboardReducer = (state = initialState, action: DashboardActions) =>
  selectReducer(action.type, dashboardReducers)(action)(state);
