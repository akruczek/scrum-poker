import * as R from 'ramda';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS, AUTH_TYPES } from '@core/models';

export const authContent = (prop: 'buttonText' | 'title'): { [key: string]: string } =>
  R.propOr({}, prop, {
    buttonText: {
      [AUTH_TYPES.JOIN]: translate(TRANSLATIONS.JOIN),
      [AUTH_TYPES.LOGIN]: translate(TRANSLATIONS.LOGIN),
    },
    title: {
      [AUTH_TYPES.JOIN]: translate(TRANSLATIONS.JOIN_SESSION),
      [AUTH_TYPES.LOGIN]: translate(TRANSLATIONS.SIGN_IN),
    },
  },
);
