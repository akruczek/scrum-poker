import * as R from 'ramda';
import { FirebaseStateModel } from '../../../models/firebase.models';
import { FIREBASE_ACTIONS, FirebaseActions } from './firebase.actions';

const initialState: FirebaseStateModel = {
  isPending: false,
  model: {
    token: null,
  },
};

const setFirebaseAccessReducer = (payload: boolean) =>
  R.assocPath([ 'isPending', 'token' ], payload);

const reducers = {
  [FIREBASE_ACTIONS.SET_ACCESS]: setFirebaseAccessReducer,
};

const selectReducer = (type: FIREBASE_ACTIONS): any =>
  reducers[type] || R.always(R.identity);

export function firebaseReducer(state = initialState, action: FirebaseActions) {
  return selectReducer(action.type)(action)(state);
}
