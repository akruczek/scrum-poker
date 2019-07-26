import * as R from 'ramda';
import * as pl from '../../constants/translations/pl.json';
import * as en from '../../constants/translations/en.json';
import { LANGUAGE_CODES, Translation } from '../../models/translations.models';
import { Storage } from '../device-storage/device-storage.service';
import { TRANSLATIONS_ACTIONS } from './store/translations.actions';
import { appStore } from '../../../store/configure-store';

export const Translations = {
  get: async (code: string): Promise<Translation[]> => await R.propOr(
    {},
    code,
    { en, pl },
  ),

  initialize: (): void => {
    const action = (payload: Translation[]) => ({
      type: TRANSLATIONS_ACTIONS.GET_TRANSLATIONS,
      payload: payload || LANGUAGE_CODES.EN,
    });

    Storage
      .get('userLanguage')
      .then((payload: LANGUAGE_CODES | any) => appStore.dispatch(action(payload)))
  },
}
