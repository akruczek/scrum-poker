import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS, EDIT_ROOMS_TYPES } from '@core/models';
import { getEditRoomContent } from './get-edit-room-content.helper';

describe('when getEditRoomContent was called', () => {
  describe('and given type is one of EDIT_ROOMS_TYPES values', () => {
    it('should return specific translation', () => {
      expect(getEditRoomContent(EDIT_ROOMS_TYPES.CREATE))
        .toEqual(translate(TRANSLATIONS.CREATE_ROOM));
    });
  });

  describe('and given type is not one of EDIT_ROOMS_TYPES values', () => {
    it('should return empty string', () => {
      expect(getEditRoomContent('x' as any))
        .toEqual('');
    });
  });
});
