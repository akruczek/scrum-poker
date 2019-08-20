import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { authSignIn } from './auth-sign-in.helper';

describe('when authSignIn was called', () => {
  const signIn = jest.fn();
  const throwError = jest.fn();

  describe('and given email match email pattern', () => {
    beforeEach(() => {
      authSignIn('test@example.com')(signIn, throwError)
    });

    it('should call signIn with given email', () => {
      expect(signIn)
        .toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('and given email does not match email pattern', () => {
    beforeEach(() => {
      authSignIn('test.example.com')(signIn, throwError)
    });

    it('should call throwError with TRANSLATIONS.WRONG_EMAIL translation', () => {
      expect(throwError)
        .toHaveBeenCalledWith(translate(TRANSLATIONS.WRONG_EMAIL));
    });
  });
});
