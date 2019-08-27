import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS, AUTH_TYPES } from '@core/models';
import { authContent } from './auth-content.helper';

describe('when authContent was called', () => {
  it('should return specific object based on given prop', () => {
    const expectedResult = {
      [AUTH_TYPES.JOIN]: translate(TRANSLATIONS.JOIN_SESSION),
      [AUTH_TYPES.LOGIN]: translate(TRANSLATIONS.SIGN_IN),
    };

    expect(authContent('title'))
      .toEqual(expectedResult);
  });

  it('should return empty object if no key exist in static object', () => {
    expect(authContent('text' as any))
      .toEqual({})
  });
});
