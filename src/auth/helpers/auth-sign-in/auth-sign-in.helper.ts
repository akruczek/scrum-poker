import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { validateEmail } from '../validate-email/validate-email.helper';

export const authSignIn = (
  email: string,
) => (
  signIn: (email: string) => void,
  throwError: (translation: string) => void,
) => {
  if (validateEmail(email)) {
    signIn(email);
  } else {
    throwError(translate(TRANSLATIONS.WRONG_EMAIL));
  };
};
