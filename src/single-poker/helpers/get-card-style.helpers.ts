import * as R from 'ramda';
import { isRiskCard } from './is-risk-card.helper';
import { CARD_COLORS } from '../models/poker-card.models';
import { colors } from '../../core/constants/colors';

export const getCardColorStyle = (value: any) =>
  isRiskCard(value)
    ? { backgroundColor: R.prop(CARD_COLORS[value.split('-')[1]] as any, colors) }
    : {};

export const getCardTitleStyle = (value: any) =>
  isRiskCard(value) ? { display: 'none' as 'none' } : {};
