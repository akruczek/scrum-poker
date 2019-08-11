import * as R from 'ramda';
import { TRANSLATIONS } from '../../models';
import { appStore } from '../../../store/configure-store';

export const translate = (key: TRANSLATIONS): string =>
  R.propOr(key, key, appStore.getState().translations.models);
