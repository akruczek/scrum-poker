import * as React from 'react';
import { Button } from 'react-native-elements';
import { getRiskCardColor, isRiskCard, NOOP } from '../../helpers';

interface Props {
  label: string;
  value: string | number;
  handlePress?: (value: string | number) => void;
}

export const CardIcon = ({ label, value, handlePress }: Props) => {
  const isLongLabel = String(label).length > 2;

  const buttonStyle = {
    width: 45,
    height: 45,
    backgroundColor: getRiskCardColor(value),
    padding: 5,
  };

  const buttonTitleStyle = {
    fontSize: isLongLabel ? 16 : 20,
    display: isRiskCard(value) ? 'none' as 'none' : 'flex' as 'flex',
    fontFamily: 'livvic',
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
