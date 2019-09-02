import * as React from 'react';
import * as R from 'ramda';
import { ButtonGroup } from 'react-native-elements';
import { PokerModel } from '@core/models';
import { pokers, defaultFont } from '@core/constants';

interface Props {
  poker: PokerModel;
  setPoker: (poker: PokerModel) => void,
}

export const PokerButtons = ({ poker, setPoker }: Props) => (
  <>
    {R.splitEvery(2, pokers).map((buttonsGroup: PokerModel[], index: number) => (
      <ButtonGroup
          key={buttonsGroup[0].name}
          buttons={R.map(R.prop('title'), buttonsGroup)}
          selectedIndex={R.findIndex(R.propEq('name', poker.name))(pokers) - (2 * index)}
          onPress={groupIndex => setPoker(pokers[groupIndex + (2 * index)])}
          textStyle={{ fontFamily: defaultFont }}
      />
    ))}
  </>
);
