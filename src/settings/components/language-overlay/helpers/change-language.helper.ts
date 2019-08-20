import { LANGUAGE_CODES } from '@core/models';

export const changeLanguage = (
  language: LANGUAGE_CODES,
  currentLanguage: LANGUAGE_CODES,
) => (
  handleClose: () => void,
  setLanguage: (language: LANGUAGE_CODES) => void,
  setReloadInformation: (value: boolean) => void,
) => {
  if (language === currentLanguage) {
    handleClose();
  } else {
    setLanguage(language);
    setReloadInformation(true);
  }
};
