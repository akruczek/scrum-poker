import * as R from 'ramda';
import { isPresent } from '@core/helpers';

export const getRoomsList = R.ifElse(
  isPresent,
  R.pipe(
    R.values,
    R.filter(isPresent),
  ),
  R.always([]),
);
