import * as R from 'ramda';
import { TranslationsStateModel, LANGUAGE_CODES } from '../../../models/translations.models';
import {
  TRANSLATIONS_ACTIONS, TranslationsActions,
  GetTranslationsAction, GetTranslationsSuccessAction, GetTranslationsErrorAction,
  SetLanguageAction, SetLanguageSuccessAction, SetLanguageErrorAction,
} from './translations.actions';

const initialState: TranslationsStateModel = {
  isPending: false,
  models: [],
  error: {},
  language: LANGUAGE_CODES.EN,
};

const getTranslationsReducer = (action: GetTranslationsAction) => R.pipe(
  R.assoc('language', action.payload),
  R.assoc('isPending', true),
);

const getTranslationsSuccessReducer = (action: GetTranslationsSuccessAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('models', action.payload),
);

const getTranslationsErrorReducer = (action: GetTranslationsErrorAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('error', action.payload)
);

const setLanguageReducer = (_: SetLanguageAction) =>
  R.assoc('isPending', true);

const setLanguageSuccessReducer = (action: SetLanguageSuccessAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('language', action.payload),
);

const setLanguageErrorReducer = (action: SetLanguageErrorAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('error', action.payload),
);

const reducers = {
  [TRANSLATIONS_ACTIONS.GET_TRANSLATIONS]: getTranslationsReducer,
  [TRANSLATIONS_ACTIONS.GET_TRANSLATIONS_SUCCESS]: getTranslationsSuccessReducer,
  [TRANSLATIONS_ACTIONS.GET_TRANSLATIONS_ERROR]: getTranslationsErrorReducer,
  [TRANSLATIONS_ACTIONS.SET_LANGUAGE]: setLanguageReducer,
  [TRANSLATIONS_ACTIONS.SET_LANGUAGE_SUCCESS]: setLanguageSuccessReducer,
  [TRANSLATIONS_ACTIONS.SET_LANGUAGE_ERROR]: setLanguageErrorReducer,
  [TRANSLATIONS_ACTIONS.INITIALIZE]: () => R.identity,
};

const selectReducer = (type: TRANSLATIONS_ACTIONS): any =>
  reducers[type] || R.always(R.identity);

export function translationsReducer(state = initialState, action: TranslationsActions) {
  return selectReducer(action.type)(action)(state);
}
