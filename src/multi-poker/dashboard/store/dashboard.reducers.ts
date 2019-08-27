import * as R from 'ramda';
import { RoomsStateModel } from '@core/models';
import {
  DASHBOARD_ACTIONS, DashboardActions, SetRoomsAction, SetRoomAction,
  AddRoomAction, RemoveRoomAction, AddUserAction, RoomAction, SetValueAction,
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

const addUserReducer = (action: AddUserAction) => R.evolve({
  models: R.append(action.payload),
});

const resetReducer = (action: RoomAction) => R.pipe(
  R.assoc('model', action.payload),
);

const setValueReducer = (action: SetValueAction) => R.pipe(
  R.assocPath([ 'model', action.payload.roomId, 'users', action.payload.userId ], action.payload.value),
);

const roomsReducers = {
  [DASHBOARD_ACTIONS.SET_ROOMS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.SET_ROOM]: setRoomReducer,
  [DASHBOARD_ACTIONS.ADD_ROOM]: addRoomReducer,
  [DASHBOARD_ACTIONS.ADD_ROOM_SUCCESS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.REMOVE_ROOM]: removeRoomReducer,
  [DASHBOARD_ACTIONS.REMOVE_ROOM_SUCCESS]: setRoomsReducer,
  [DASHBOARD_ACTIONS.ADD_USER]: addUserReducer,
  [DASHBOARD_ACTIONS.RESET]: resetReducer,
  [DASHBOARD_ACTIONS.SET_VALUE]: setValueReducer,
};

const selectReducer = (type: DASHBOARD_ACTIONS, reducers: any): any =>
  reducers[type] || R.always(R.identity);

export function roomsReducer(state = initialState, action: DashboardActions) {
  return selectReducer(action.type, roomsReducers)(action)(state);
}
