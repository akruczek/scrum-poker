import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { authContent } from './auth-content.helper';
import { AUTH_TYPES } from '../../models/auth.models';

describe('when authContent was called', () => {
  it('should return specific object based on given prop', () => {
    const expectedResult = {
      [AUTH_TYPES.JOIN]: translate(TRANSLATIONS.JOIN_SESSION),
      [AUTH_TYPES.LOGIN]: translate(TRANSLATIONS.SIGN_IN),
    };

    expect(authContent('title'))
      .toEqual(expectedResult);
  });  
});
