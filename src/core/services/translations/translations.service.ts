import * as R from 'ramda';
import * as pl from '@assets/translations/pl.json';
import * as en from '@assets/translations/en.json';
import { Translation } from '../../models/translations.models';

export const Translations = {
  get: async (code: string): Promise<Translation[]> => await R.propOr(
    {},
    code,
    { en, pl },
  ),
}
