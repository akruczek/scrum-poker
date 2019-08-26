import * as React from 'react';
import { Input } from 'react-native-elements';
import { ifElse } from '../../helpers';
import { TRANSLATIONS } from '../../models';
import { Container, Text } from '../../styled';
import { TEXT_SIZES } from '../../constants';
import { translate } from '../../services/translations/translate';

interface Props {
  label?: TRANSLATIONS | string;
  labelSize?: TEXT_SIZES;
  value?: string;
  placeholder?: TRANSLATIONS | string;
  handleChange: (value: string) => void;
  centered?: boolean;
}

export const CustomInput = ({ label, labelSize, placeholder, value, handleChange, centered }: Props) => {
  const onChange = (value: string) => {
    handleChange(value);
  };

  const inputElement = () => (
    <Input
        value={value}
        placeholder={translate(placeholder || '')}
        onChangeText={onChange}
        inputStyle={centered ? { textAlign: 'center' } : {}}
    />
  );

  return ifElse(
    () => !!label,
    <Container alignItems="center">
      <Text size={labelSize || TEXT_SIZES.SMALL} children={translate(label || '')} />
      {inputElement()}
    </Container>,
    inputElement(),
  );
};
