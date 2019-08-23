import * as React from 'react';
import { CheckBox } from 'react-native-elements';
import { TRANSLATIONS } from '../../models';
import { TEXT_SIZES } from '../../constants';
import { translate } from '@core/services/translations/translate';

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
        title={translate(title)}
        checked={checked}
        onPress={handlePress}
        textStyle={{ fontSize: TEXT_SIZES.REGULAR }}
        containerStyle={{ padding: 15 }}
    />
  )
};
