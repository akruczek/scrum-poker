import 'jasmine';
import { LANGUAGE_CODES } from '../../../models/translations.models';
import { getTranslations, getTranslationsSuccess, getTranslationsError, setLanguage, setLanguageSuccess, setLanguageError } from './translations.actions';
import { translationsReducer } from './translations.reducers';

describe('Translations reducers', () => {
  let store: any = {};
  let payload: any;
  let action: any;

  beforeEach(() => {
    store = {
      isPending: false,
      models: [],
      error: {},
      language: LANGUAGE_CODES.EN,
    };
  });

  describe('when getTranslationsReducer was called', () => {
    it('should set language with action payload and set pending to true', () => {
      payload = LANGUAGE_CODES.PL;
      action = getTranslations(payload);
      const newState = translationsReducer(store, action);

      expect(newState.isPending).toBeTruthy();
      expect(newState.language).toEqual(payload);
    });
  });

  describe('when getTranslationsSuccessReducer was called', () => {
    it('should set pending to false and assoc action payload to models', () => {
      payload = { translation1: 'Hello World!' };
      action = getTranslationsSuccess(payload);
      const newState = translationsReducer(store, action);

      expect(newState.isPending).toBeFalsy();
      expect(newState.models).toEqual(payload);
    });
  });

  describe('when getTranslationsErrorReducer was called', () => {
    it('should set pending to false and replace error with action payload', () => {
      payload = { message: 'Internal Server Error!', code: 500 };
      action = getTranslationsError(payload);
      const newState = translationsReducer(store, action);

      expect(newState.isPending).toBeFalsy();
      expect(newState.error).toEqual(payload);
    });
  });

  describe('when setLanguageReducer was called', () => {
    it('should set pending to true', () => {
      action = setLanguage();
      const newState = translationsReducer(store, action);

      expect(newState.isPending).toBeTruthy();
    });
  });

  describe('when setLanguageSuccessReducer was called', () => {
    it('should set pending to false and language with action payload', () => {
      payload = LANGUAGE_CODES.PL;
      action = setLanguageSuccess(payload);
      const newState = translationsReducer(store, action);

      expect(newState.isPending).toBeFalsy();
      expect(newState.language).toEqual(payload);
    });
  });

  describe('when setLanguageErrorReducer was called', () => {
    it('should set pending to false and replace error with action payload', () => {
      payload = { message: 'some-error', code: 300 };
      action = setLanguageError(payload);
      const newState = translationsReducer(store, action);

      expect(newState.isPending).toBeFalsy()
      expect(newState.error).toEqual(payload);
    });
  });
});
