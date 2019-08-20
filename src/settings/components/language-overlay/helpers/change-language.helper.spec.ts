import { changeLanguage } from './change-language.helper';
import { LANGUAGE_CODES } from '@core/models';

describe('when changeLanguage was called', () => {
  const handleClose = jest.fn();
  const setLanguage = jest.fn();
  const setReloadInformation = jest.fn();

  describe('and given language and current language are the same', () => {
    beforeEach(() => {
      changeLanguage(LANGUAGE_CODES.EN, LANGUAGE_CODES.EN)(handleClose, setLanguage, setReloadInformation);
    });

    it('should call handleClose function', () => {
      expect(handleClose)
        .toHaveBeenCalled();
    });
  });

  describe('and given language and current language are not the same', () => {
    beforeEach(() => {
      changeLanguage(LANGUAGE_CODES.EN, LANGUAGE_CODES.PL)(handleClose, setLanguage, setReloadInformation);
    });

    it('should call setLanguage with given language and setReloadInformation with "true"', () => {
      expect(setLanguage)
        .toHaveBeenCalledWith(LANGUAGE_CODES.EN);
      expect(setReloadInformation)
        .toHaveBeenCalledWith(true);
    });
  });
});
