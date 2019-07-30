import { combineReducers } from 'redux';
import { AuthStateModel } from '../auth/models/auth.models';
import { authReducer } from '../auth/store/auth.reducers';
import { RoomsStateModel } from '../multi-poker/models/room.models';
import { roomsReducer } from '../multi-poker/dashboard/store/dashboard.reducers';
import { TranslationsStateModel } from '../core/models/translations.models';
import { translationsReducer } from '../core/services/translations/store/translations.reducers';

export interface AppState {
  auth: AuthStateModel;
  rooms: RoomsStateModel;
  translations: TranslationsStateModel;
}

export const reducers = combineReducers({
  auth: authReducer,
  rooms: roomsReducer,
  translations: translationsReducer,
});
