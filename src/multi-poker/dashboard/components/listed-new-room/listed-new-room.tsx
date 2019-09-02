import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { Text } from '@core/styled';

interface Props {
  setCreateRoom: (value: boolean) => void;
}

export const ListedNewRoom = ({ setCreateRoom }: Props) => (
  <>
    <TouchableOpacity onPress={() => setCreateRoom(true)}>
      <ListItem
          title={<Text children={translate(TRANSLATIONS.ADD_ROOM)} />}
          subtitle={<Text children={translate(TRANSLATIONS.ADD_NEW_ROOM)} />}
          rightIcon={{ name: 'add' }}
      />
    </TouchableOpacity>
    <Divider />
  </>
);
