import * as React from 'react';
import { Input } from 'react-native-elements';
import { Separator } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';

interface Props {
  name: string;
  description: string;
  handleChange: (prop: 'name' | 'description', value: string) => void,
}

export const EditRoomForm = ({ name, description, handleChange }: Props) => (
  <>
    <Separator margin={10} />
    <Input
        value={name}
        placeholder={translate(TRANSLATIONS.PLACEHOLDER_NAME)}
        onChangeText={(value: string) => handleChange('name', value)}
    />
    <Separator margin={20} />
    <Input
        value={description}
        placeholder={translate(TRANSLATIONS.PLACEHOLDER_DESCRIPTION)}
        onChangeText={(value: string) => handleChange('description', value)}
    />
    <Separator margin={20} />
  </>
);
