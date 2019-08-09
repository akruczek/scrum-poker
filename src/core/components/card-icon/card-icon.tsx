import * as React from 'react';
import * as R from 'ramda';
import { Button } from 'react-native-elements';
import { getRiskCardColor, isRiskCard, NOOP } from '../../helpers';

interface Props {
  label: string;
  value: string | number;
  handlePress?: (value: string | number) => void;
}

export const CardIcon = ({ label, value, handlePress }: Props) => {
  const isLongValue = String(value).length > 2;

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
        title={String(label || '?')}
        onPress={() => handlePress ? handlePress(value) : NOOP()}
        buttonStyle={buttonStyle}
        titleStyle={buttonTitleStyle}
    />  
  );
};
