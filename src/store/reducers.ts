import { combineReducers } from 'redux';
import { FirebaseStateModel } from '../core/models/firebase.models';
import { firebaseReducer } from '../core/services/firebase/store/firebase.reducers';
import { AuthStateModel } from '../auth/models/auth.models';
import { authReducer } from '../auth/store/auth.reducers';
import { RoomsStateModel } from '../multi-poker/models/room.models';
import { roomsReducer } from '../multi-poker/dashboard/store/dashboard.reducers';
import { TranslationsStateModel } from '../core/models/translations.models';
import { translationsReducer } from '../core/services/translations/store/translations.reducers';

export interface AppState {
  firebase: FirebaseStateModel;
  auth: AuthStateModel;
  rooms: RoomsStateModel;
  translations: TranslationsStateModel;
}

export const reducers = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  rooms: roomsReducer,
  translations: translationsReducer,
});
