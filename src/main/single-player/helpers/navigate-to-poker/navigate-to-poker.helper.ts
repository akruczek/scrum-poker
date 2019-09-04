import * as R from 'ramda';
import { PokerModel } from '@core/models';
import { SCREENS } from '@core/constants';

export const navigateToPoker = (
  navigate: (screen: SCREENS, options?: {[key: string]: string | PokerModel}) => void,
) => (
  poker: PokerModel,
) => {
  navigate(
    SCREENS.SINGLE_POKER,
    R.pick([ 'title', 'cards' ], poker),
  );
};