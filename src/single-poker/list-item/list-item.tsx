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

export const ListItem = (props: Props) => {
  const { icon, name, description } = props.poker;

  const leftElement = (
    <CustomIcon size={R.propOr(ICON_SIZES.STANDARD, 'iconSize', props)} source={icon} />
  );

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => props.handlePress(props.poker)}>
        <ListItemElement
            leftElement={leftElement}
            rightIcon={{ name: 'arrow-forward' }}
            title={name}
            subtitle={description}
        />
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );
};
