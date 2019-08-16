import * as R from 'ramda';
import { PokerCard } from '../../../../core/models';

export const getMiddleEstimations = R.when(
  (array: PokerCard[]) => array.length > 3,
  (array: PokerCard[]) => {
    const index = Math.floor(array.length / 2);
    return [ -1, 0, 1 ].map(value => array[index + value])
  },
);
