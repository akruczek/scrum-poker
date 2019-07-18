import { combineReducers } from 'redux';
import { FirebaseStateModel } from '../core/models/firebase.models';
import { firebaseReducer } from '../core/services/firebase/store/firebase.reducers';

export interface AppState {
  firebase: FirebaseStateModel;
}

export const reducers = combineReducers({
  firebase: firebaseReducer,
});
