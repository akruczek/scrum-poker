import { appStore } from '../../../store/configure-store';
import { Translations } from './translations.service';
import { translate } from '@core/services/translations/translate';
import * as pl from '@assets/translations/pl.json';
import * as en from '@assets/translations/en.json';

describe('Translations Service', () => {
  describe('when translate function was called', () => {
    beforeEach(() => {
      spyOn(appStore, 'getState').and.returnValue({
        translations: {
          models: {
            translation1: 'hello World!',
            translation2: 'Scrum',
          },
        },
      });
    });

    it('should return translation from appState by given key if it exist', () => {
      expect(translate('translation1' as any))
        .toEqual('hello World!');

      expect(translate('translation2' as any))
        .toEqual('Scrum');
    });

    it('should return given key if translation for given key does not exist', () => {
      expect(translate('hello' as any))
        .toBe('hello');
    });
  });

  describe('Translations', () => {
    describe('when Translations.get was called', () => {
      it('should return translations for given language', () => {
        Translations.get('pl').then(response => {
          expect(response)
            .toEqual(pl);
        });

        Translations.get('en').then(response => {
          expect(response)
            .toEqual(en);
        });
      });

      it('should return empty object when there is no translations for given language', () => {
        Translations.get('nl').then(response => {
          expect(response)
            .toBe({});
        });
      });
    });
  });
});
