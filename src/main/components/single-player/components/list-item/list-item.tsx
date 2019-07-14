import * as React from 'react';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import { Divider, ListItem as ListItemElement } from 'react-native-elements';
import { CustomIcon } from '../../../../../core/styled/custom-icon/custom-icon';
import { ListItemModel } from '../../models/list-item.model';
import { ICON_SIZES } from '../../../../../core/models/custom-icons.models';

interface Props {
  item: ListItemModel;
  iconSize?: ICON_SIZES;
  handlePress: (name: string) => void;
}

export const ListItem = (props: Props) => {
  const { icon, name, description } = props.item;

  const leftElement = (
    <CustomIcon size={R.propOr(ICON_SIZES.STANDARD, 'iconSize', props)} source={icon} />
  );

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => props.handlePress(name)}>
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
