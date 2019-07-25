import * as R from 'ramda';
import { COLORS } from '../../../../core/constants/colors';

const isEstimationUndefined = R.complement(R.is(Number));

export const getListedUserColor = (
  isRoomDiscovered: boolean,
  isDivergence: boolean,
  isEqualDivergence: boolean,
  isValuePresent: boolean,
  selectedValue: number,
): COLORS => R.cond([
  [ () => (isRoomDiscovered && isDivergence && isEqualDivergence), R.prop('RED_OPACITY') ],
  [ () => (isValuePresent && !isRoomDiscovered), R.prop('GREEN_OPACITY') ],
  [ () => (!isValuePresent && !isRoomDiscovered), R.prop('WHITE') ],
  [ () => (isRoomDiscovered && isEstimationUndefined(selectedValue)), R.prop('YELLOW_CARD') ],
  [ R.T, R.prop('WHITE') ],
])(COLORS);
