import { getLanguageItemContent } from './get-language-item-content.helper';
import { LANGUAGE_CODES, TRANSLATIONS } from '../../../core/models';

describe('when getLanguageItemContent was called', () => {
  it('should return specific title or subtitle translation based on given language code', () => {
    expect(getLanguageItemContent(LANGUAGE_CODES.PL)('title'))
      .toEqual(TRANSLATIONS.LANGUAGE_PL);

    expect(getLanguageItemContent(LANGUAGE_CODES.EN)('subtitle'))
      .toEqual(TRANSLATIONS.LANGUAGE_EN_NATIVE);
  });

  it('should return empty string when no translation was found', () => {
    expect(getLanguageItemContent('nl' as any)('title'))
      .toEqual('');
  });
});
