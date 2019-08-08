import * as R from 'ramda';
import { LANGUAGE_CODES, TRANSLATIONS } from '@core/models';

export const getLanguageItemContent = (code: LANGUAGE_CODES) => R.prop<{[key: string]: TRANSLATIONS}>(R.__, ({
  title: R.propOr('', `LANGUAGE_${R.toUpper(code)}`, TRANSLATIONS),
  subtitle: R.propOr('', `LANGUAGE_${R.toUpper(code)}_NATIVE`, TRANSLATIONS),
}));
