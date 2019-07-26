import { Action } from 'redux';
import { LANGUAGE_CODES, Translation } from '../../../models/translations.models';

export enum TRANSLATIONS_ACTIONS {
  GET_TRANSLATIONS = '[Translations]: Get translations',
  GET_TRANSLATIONS_SUCCESS = '[Translations]: Get translations success',
  GET_TRANSLATIONS_ERROR = '[Translations]: Get translations error',
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

export type TranslationsActions =
  GetTranslationsAction &
  GetTranslationsSuccessAction &
  GetTranslationsErrorAction;

const newAction = <P>(type: TRANSLATIONS_ACTIONS) =>
  (payload?: P): { type: TRANSLATIONS_ACTIONS, payload?: P } => ({ type, payload });

export const getTranslations =
  newAction<LANGUAGE_CODES>(TRANSLATIONS_ACTIONS.GET_TRANSLATIONS);

export const getTranslationsSuccess =
  newAction<Translation[]>(TRANSLATIONS_ACTIONS.GET_TRANSLATIONS_SUCCESS);

export const getTranslationsError =
  newAction<any>(TRANSLATIONS_ACTIONS.GET_TRANSLATIONS_ERROR);
