import * as React from 'react';
import { CheckBox } from 'react-native-elements';
import { TRANSLATIONS } from '../../models';
import { TEXT_SIZES } from '../../constants';
import { translate } from '../../services/translations/translations.service';

interface Props {
  title: TRANSLATIONS;
  onChange: (value: boolean) => void;
}

export const Checkbox = ({ title, onChange }: Props) => {
  const [ checked, check ] = React.useState(false);

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
