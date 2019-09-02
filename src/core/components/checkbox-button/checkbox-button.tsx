import * as React from 'react';
import { CheckBox } from 'react-native-elements';
import { TRANSLATIONS } from '../../models';
import { translate } from '../../services/translations/translate';
import { Text } from '../../styled';

interface Props {
  title: TRANSLATIONS;
  onChange: (value: boolean) => void;
  defaultChecked?: boolean;
}

export const Checkbox = ({ title, onChange, defaultChecked }: Props) => {
  const [ checked, check ] = React.useState(!!defaultChecked);

  const handlePress = () => {
    check(!checked);
    onChange(!checked);
  };

  return (
    <CheckBox
        title={<Text style={{ marginLeft: 10 }} children={translate(title)} />}
        checked={checked}
        onPress={handlePress}
        containerStyle={{ padding: 15 }}
    />
  )
};
