import * as React from 'react';
import * as R from 'ramda';
import { Button } from 'react-native-elements';
import { getRiskCardColor, isRiskCard, NOOP } from '../../helpers';

interface Props {
  value: string | number;
  handlePress?: (value: string | number) => void;
}

export const CardIcon = (props: Props) => {
  const value = R.propOr('?', 'value', props);
  const isLongValue = Number(value) > 99;

  const buttonStyle = {
    width: 45,
    height: 45,
    backgroundColor: getRiskCardColor(value),
    padding: 5,
  };

  const buttonTitleStyle = {
    fontSize: isLongValue ? 16 : 20,
    display: isRiskCard(value) ? 'none' as 'none' : 'flex' as 'flex',
    fontFamily: 'space-mono',
  };
 
  return (
    <Button
        title={String(value)}
        onPress={R.propOr(NOOP, 'handlePress', props)}
        buttonStyle={buttonStyle}
        titleStyle={buttonTitleStyle}
    />  
  );
};
