import * as R from 'ramda';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { EDIT_ROOMS_TYPES } from '../../../../../models/room.models';

export const getEditRoomContent = (type: EDIT_ROOMS_TYPES) => R.pathOr(
  '',
  [ 'title', type ],
  {
    title: {
      [EDIT_ROOMS_TYPES.CREATE]: translate(TRANSLATIONS.CREATE_ROOM),
      [EDIT_ROOMS_TYPES.UPDATE]: translate(TRANSLATIONS.UPDATE_ROOM),
    }
  },
);
