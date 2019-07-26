import * as R from 'ramda';
import { TranslationsStateModel } from '../../../models/translations.models';
import {
  TRANSLATIONS_ACTIONS, TranslationsActions,
  GetTranslationsAction, GetTranslationsSuccessAction, GetTranslationsErrorAction,
} from './translations.actions';

const initialState: TranslationsStateModel = {
  isPending: false,
  models: [],
  error: {},
};

const getTranslationsReducer = (_: GetTranslationsAction) =>
  R.assoc('isPending', true);

const getTranslationsSuccessReducer = (action: GetTranslationsSuccessAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('models', action.payload),
);

const getTranslationsErrorReducer = (action: GetTranslationsErrorAction) => R.pipe(
  R.assoc('isPending', false),
  R.assoc('error', action.payload)
);

const reducers = {
  [TRANSLATIONS_ACTIONS.GET_TRANSLATIONS]: getTranslationsReducer,
  [TRANSLATIONS_ACTIONS.GET_TRANSLATIONS_SUCCESS]: getTranslationsSuccessReducer,
  [TRANSLATIONS_ACTIONS.GET_TRANSLATIONS_ERROR]: getTranslationsErrorReducer,
};

const selectReducer = (type: TRANSLATIONS_ACTIONS): any =>
  reducers[type] || R.always(R.identity);

export function translationsReducer(state = initialState, action: TranslationsActions) {
  return selectReducer(action.type)(action)(state);
}
