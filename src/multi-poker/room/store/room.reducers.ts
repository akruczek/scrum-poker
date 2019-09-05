import * as R from 'ramda';
import { RoomsStateModel } from '@core/models';
import { selectReducer } from '@core/helpers';
import { dashboardReducers } from '../../dashboard/store/dashboard.reducers';
import {
  ROOM_ACTIONS, RoomActions, AddUserAction, RoomAction, SetValueAction,
} from './room.actions';

const initialState: RoomsStateModel = {
  models: {},
  model: {},
};

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
  [ROOM_ACTIONS.ADD_USER]: addUserReducer,
  [ROOM_ACTIONS.RESET]: resetReducer,
  [ROOM_ACTIONS.SET_VALUE]: setValueReducer,
};

export const roomsReducer = (state = initialState, action: RoomActions) =>
  selectReducer(action.type, { ...roomsReducers, ...dashboardReducers })(action)(state);
