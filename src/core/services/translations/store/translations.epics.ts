import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck, map } from 'rxjs/operators';
import { Translations } from '../translations.service';
import { LANGUAGE_CODES, Translation } from '../../../models/translations.models';
import { Storage } from '../../device-storage/device-storage.service';
import {
  GetTranslationsAction, getTranslations as getTranslationsAction, TRANSLATIONS_ACTIONS,
  getTranslationsError, getTranslationsSuccess, SetLanguageAction,
  setLanguageSuccess, setLanguageError, SetLanguageSuccessAction,
} from './translations.actions';

const getTranslations = (language: LANGUAGE_CODES) => Translations
  .get(language)
  .then((terms: Translation[]) => getTranslationsSuccess(terms))
  .catch(getTranslationsError);

export const getTranslationsEpic = (action: ActionsObservable<GetTranslationsAction>) => action
  .pipe(
    ofType(TRANSLATIONS_ACTIONS.GET_TRANSLATIONS),
    pluck('payload'),
    switchMap(getTranslations),
  );

const setLanguage = (code: LANGUAGE_CODES) => Storage
  .set('userLanguage', code)
  .then(() => setLanguageSuccess(code))
  .catch(setLanguageError);

export const setLanguageEpic = (action: ActionsObservable<SetLanguageAction>) => action
  .pipe(
    ofType(TRANSLATIONS_ACTIONS.SET_LANGUAGE),
    pluck('payload'),
    switchMap(setLanguage),
  );

export const setLanguageSuccessEpic = (action: ActionsObservable<SetLanguageSuccessAction>) => action
  .pipe(
    ofType(TRANSLATIONS_ACTIONS.SET_LANGUAGE_SUCCESS),
    pluck('payload'),
    map(getTranslationsAction),
  )
