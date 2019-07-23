import { combineReducers } from 'redux';
import { FirebaseStateModel } from '../core/models/firebase.models';
import { firebaseReducer } from '../core/services/firebase/store/firebase.reducers';
import { AuthStateModel } from '../auth/models/auth.models';
import { authReducer } from '../auth/store/auth.reducers';
import { RoomsStateModel } from '../multi-poker/models/room.models';
import { roomsReducer } from '../multi-poker/dashboard/store/dashboard.reducers';

export interface AppState {
  firebase: FirebaseStateModel;
  auth: AuthStateModel;
  rooms: RoomsStateModel;
}

export const reducers = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  rooms: roomsReducer,
});
