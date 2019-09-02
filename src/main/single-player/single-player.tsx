import React from 'react';
import { NavigationProps } from '@core/navigation/navigation.model';
import { TRANSLATIONS } from '@core/models';
import { headerTitleStyle } from '@core/constants';
import { translate } from '@core/services/translations/translate';
import { PokersList } from '../../single-poker/components/pokers-list/pokers-list';
import { navigateToPoker } from './helpers/navigate-to-poker/navigate-to-poker.helper';

export const _SinglePlayer = ({ navigation }: NavigationProps) => (
  <PokersList handleNavigate={navigateToPoker(navigation.navigate)} />
);

_SinglePlayer.navigationOptions = () => ({
  title: translate(TRANSLATIONS.SINGLE_PLAYER),
  headerTitleStyle,
});

export const SinglePlayer = _SinglePlayer;
