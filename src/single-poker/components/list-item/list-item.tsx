import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Divider, ListItem as ListItemElement } from 'react-native-elements';
import { PokerModel, ICON_SIZES } from '@core/models';
import { Text } from '@core/styled';
import { ListItemIcon } from '../list-item-icon/list-item-icon';

interface Props {
  poker: PokerModel;
  iconSize?: ICON_SIZES;
  handlePress: (poker: PokerModel) => void;
}

export const ListItem = ({ poker, iconSize, handlePress }: Props) => (
  <React.Fragment>
    <TouchableOpacity onPress={() => handlePress(poker)}>
      <ListItemElement
          leftElement={<ListItemIcon {...{ iconSize, poker }} />}
          rightIcon={{ name: 'arrow-forward' }}
          title={<Text children={poker.name} />}
          subtitle={<Text children={poker.description} />}
      />
    </TouchableOpacity>
    <Divider />
  </React.Fragment>
);
