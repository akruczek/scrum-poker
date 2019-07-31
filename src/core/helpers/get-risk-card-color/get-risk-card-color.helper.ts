import * as R from 'ramda';
import { colors as elementColors } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { isRiskCard } from '../is-risk-card/is-risk-card.helper';
import { CardColors, CARD_COLORS } from '../../models/poker-card.models';

export const getRiskCardColor = R.ifElse(
  R.complement(isRiskCard),
  R.always(elementColors.primary),
  R.pipe<string, string[], CardColors, CARD_COLORS, string>(
    R.split('-'),
    R.last,
    R.prop(R.__, CARD_COLORS),
    R.prop(R.__, colors),
  ),
);
