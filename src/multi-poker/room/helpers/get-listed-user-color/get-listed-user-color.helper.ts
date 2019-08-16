import * as R from 'ramda';
import { COLORS } from '@core/constants';
import { _cond } from '../../../../core/helpers';
import { isDivergence } from '../is-divergence/is-divergence.helper';
import { isEqualDivergence } from '../is-equal-divergence/is-equal-divergence.helper';

const isEstimationUndefined = (value: string | number): boolean =>
  [ '?', '∞' ].includes(String(value));

export const getListedUserColor = (
  isRoomDiscovered: boolean,
  estimations: number[],
  selectedValue: number,
  isValuePresent: boolean,
): COLORS => _cond(
  (isRoomDiscovered && isDivergence(estimations) && isEqualDivergence(selectedValue)(estimations)),
    COLORS.RED_OPACITY,
  isValuePresent && !isRoomDiscovered, 
    COLORS.GREEN_OPACITY,
  !isValuePresent && !isRoomDiscovered,
    COLORS.WHITE,
  isRoomDiscovered && isEstimationUndefined(selectedValue),
    COLORS.YELLOW_OPACITY,
  R.T,
    COLORS.WHITE,
);
