import * as R from 'ramda';
import { UserModel, PokerCard } from '@core/models';
import { getMiddleEstimations } from '../get-middle-estimations/get-middle-estimations.helper';

export const getEstimationProposition =
  R.pipe<{[key: string]: UserModel}, UserModel[], PokerCard[], PokerCard[], PokerCard[], PokerCard[], PokerCard[], PokerCard[]>(
    R.values,
    R.map<UserModel, PokerCard>(R.propOr({}, 'selectedValue')),
    R.uniq,
    R.reject(R.isEmpty),
    R.reject(R.either(R.propEq('value', '?'), R.propEq('value', '∞'))),
    R.sortBy(R.prop('value')),
    getMiddleEstimations,
  );
