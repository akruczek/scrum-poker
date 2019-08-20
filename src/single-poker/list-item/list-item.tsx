import * as React from 'react';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import { Divider, ListItem as ListItemElement } from 'react-native-elements';
import { CustomIcon } from '@core/styled';
import { PokerModel, ICON_SIZES } from '@core/models';

interface Props {
  poker: PokerModel;
  iconSize?: ICON_SIZES;
  handlePress: (poker: PokerModel) => void;
}

export const ListItem = ({ poker, iconSize, handlePress }: Props) => {
  const leftElement = (
    <CustomIcon size={iconSize || ICON_SIZES.STANDARD} source={poker.icon} />
  );

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => handlePress(poker)}>
        <ListItemElement
            leftElement={leftElement}
            rightIcon={{ name: 'arrow-forward' }}
            title={poker.name}
            subtitle={poker.description}
        />
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );
};
