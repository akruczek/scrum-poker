import { Action } from 'redux';
import { LANGUAGE_CODES, Translation } from '../../../models/translations.models';
import { newAction } from '../../../helpers';

export enum TRANSLATIONS_ACTIONS {
  SET_LANGUAGE = '[Translations]: Set language code',
  SET_LANGUAGE_SUCCESS = '[Translations]: Set language code success',
  SET_LANGUAGE_ERROR = '[Translations]: Set language code error',
  GET_TRANSLATIONS = '[Translations]: Get translations',
  GET_TRANSLATIONS_SUCCESS = '[Translations]: Get translations success',
  GET_TRANSLATIONS_ERROR = '[Translations]: Get translations error',
  INITIALIZE = '[Translations]: Initialize',
}

export interface GetTranslationsAction extends Action {
  payload: LANGUAGE_CODES;
}

export interface GetTranslationsSuccessAction extends Action {
  payload: Translation[];
}

export interface GetTranslationsErrorAction extends Action {
  payload: any;
}

export interface SetLanguageAction extends Action {
  payload: LANGUAGE_CODES;
}

export interface SetLanguageSuccessAction extends Action {
  payload: LANGUAGE_CODES;
}

export interface SetLanguageErrorAction extends Action {
  payload: any;
}

export type TranslationsActions =
  GetTranslationsAction &
  GetTranslationsSuccessAction &
  GetTranslationsErrorAction &
  SetLanguageAction &
  SetLanguageSuccessAction &
  SetLanguageErrorAction;

export const getTranslations =
  newAction<TRANSLATIONS_ACTIONS, LANGUAGE_CODES>(TRANSLATIONS_ACTIONS.GET_TRANSLATIONS);
export const getTranslationsSuccess =
  newAction<TRANSLATIONS_ACTIONS, Translation[]>(TRANSLATIONS_ACTIONS.GET_TRANSLATIONS_SUCCESS);
export const getTranslationsError =
  newAction<TRANSLATIONS_ACTIONS, any>(TRANSLATIONS_ACTIONS.GET_TRANSLATIONS_ERROR);

export const setLanguage = 
  newAction<TRANSLATIONS_ACTIONS, LANGUAGE_CODES>(TRANSLATIONS_ACTIONS.SET_LANGUAGE);
export const setLanguageSuccess = 
  newAction<TRANSLATIONS_ACTIONS, LANGUAGE_CODES>(TRANSLATIONS_ACTIONS.SET_LANGUAGE_SUCCESS);
export const setLanguageError = 
  newAction<TRANSLATIONS_ACTIONS, any>(TRANSLATIONS_ACTIONS.SET_LANGUAGE_ERROR);

export const initializeTranslations =
  newAction<TRANSLATIONS_ACTIONS, {}>(TRANSLATIONS_ACTIONS.INITIALIZE);
