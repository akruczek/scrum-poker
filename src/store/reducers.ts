import { combineReducers } from 'redux';
import { FirebaseStateModel } from '../core/models/firebase.models';
import { firebaseReducer } from '../core/services/firebase/store/firebase.reducers';
import { authReducer } from '../multi-poker/auth/store/auth.reducers';
import { AuthStateModel } from '../core/models/auth.models';

export interface AppState {
  firebase: FirebaseStateModel;
  auth: AuthStateModel;
}

export const reducers = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
});
