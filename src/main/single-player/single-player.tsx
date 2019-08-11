import React from 'react';
import * as R from 'ramda';
import { NavigationProps } from '@core/navigation/navigation.model';
import { PokerModel, TRANSLATIONS } from '@core/models';
import { translate } from '@core/services/translations/translate';
import { SCREENS } from '@core/navigation/screens';
import { PokersList } from '../../single-poker/pokers-list/pokers-list';

export const _SinglePlayer = ({ navigation }: NavigationProps) => {
  const handleNavigate = (item: PokerModel) => {
    navigation.navigate(
      SCREENS.SINGLE_POKER,
      R.pick([ 'title', 'cards' ], item),
    );
  };

  return (
    <PokersList handleNavigate={handleNavigate} />
  );
};

_SinglePlayer.navigationOptions = () => ({
  title: translate(TRANSLATIONS.SINGLE_PLAYER),
});

export const SinglePlayer = _SinglePlayer;
