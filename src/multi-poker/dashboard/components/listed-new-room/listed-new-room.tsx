import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';

interface Props {
  setCreateRoom: (value: boolean) => void;
}

export const ListedNewRoom = (props: Props) => (
  <>
    <TouchableOpacity onPress={() => props.setCreateRoom(true)}>
      <ListItem
          title={translate(TRANSLATIONS.ADD_ROOM)}
          subtitle={translate(TRANSLATIONS.ADD_NEW_ROOM)}
          rightIcon={{ name: 'add' }}
      />
    </TouchableOpacity>
    <Divider />
  </>
)
