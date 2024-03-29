import * as React from 'react';
import { Button } from 'react-native-elements';
import layout from '../../constants/layout';
import { isRiskCard, getRiskCardColor } from '../../helpers';
import { PokerCard } from '../../models';
import { defaultFont } from '../../constants';

interface Props {
  card: PokerCard;
  handleSelect: (card: PokerCard) => void;
  fullScreen?: boolean;
}

export const CardButton = (props: Props) => {
  const { card, fullScreen } = props;
  const { width, height } = layout.window;

  const buttonStyle = {
    width: fullScreen ? width : 80,
    height: fullScreen ? height : 120,
    margin: fullScreen ? 0 : 10,
    backgroundColor: getRiskCardColor(card.value),
  };

  const buttonTitleStyle = {
    fontFamily: defaultFont,
    fontSize: fullScreen ? 160 : 30,
    display: isRiskCard(card.value) ? 'none' as 'none' : 'flex' as 'flex',
  };

  return (
    <Button
        title={String(card.label)}
        onPress={() => props.handleSelect(card)}
        buttonStyle={buttonStyle}
        titleStyle={buttonTitleStyle}
        raised
    />  
  );
};
