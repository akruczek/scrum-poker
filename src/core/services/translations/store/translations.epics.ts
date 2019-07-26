import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { GetTranslationsAction, TRANSLATIONS_ACTIONS, getTranslationsError, getTranslationsSuccess } from './translations.actions';
import { Translations } from '../translations.service';
import { LANGUAGE_CODES, Translation } from '../../../models/translations.models';

const getTranslations = () => Translations
  .get(LANGUAGE_CODES.EN)
  .then((terms: Translation[]) => getTranslationsSuccess(terms))
  .catch(getTranslationsError);

export const getTranslationsEpic = (action: ActionsObservable<GetTranslationsAction>) => action
  .pipe(
    ofType(TRANSLATIONS_ACTIONS.GET_TRANSLATIONS),
    pluck('payload'),
    switchMap(getTranslations),
  );
