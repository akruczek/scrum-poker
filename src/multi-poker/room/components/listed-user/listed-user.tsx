import * as React from 'react';
import * as R from 'ramda';
import { ListItem, Divider } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { parseBriiskName, isPresent } from '@core/helpers';
import { CardIcon } from '@core/components';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';
import { ListedUserIcon } from '../listed-user-icon/listed-user-icon';
import { getListedUserColor, getListedUserIcon } from '../../helpers';

interface Props {
  user: UserModel;
  room: RoomModel;
  onListItemPress: (email: string) => void;
  email: string;
  estimations: (number|string)[] | null;
}

export const ListedUser = (props: Props) => {
  const { user, room, email } = props;

  const selectedValue = R.pathOr(null, [ 'selectedValue', 'value' ], user);
  const selectedLabel = R.pathOr('?', [ 'selectedValue', 'label' ], user);
  const estimations: number[] = R.propOr([], 'estimations', props);

  const isValuePresent = isPresent(user.selectedValue);
  const isRoomDiscovered: boolean = R.propOr(false, 'discovered', room);
  const isCurrentUser = R.propEq('email', email, user);
  const icon = getListedUserIcon(isValuePresent, isRoomDiscovered, isCurrentUser);

  const handlePress = () => {
    props.onListItemPress(user.email);
  };

  const color = getListedUserColor(
    isRoomDiscovered, estimations, selectedValue, isValuePresent,
  )

  const rightElement = (isValuePresent && isRoomDiscovered) || (isValuePresent && isCurrentUser)
    ? <CardIcon label={selectedLabel} value={selectedValue} handlePress={handlePress} />
    : <ListedUserIcon isCurrentUser={isCurrentUser} icon={icon} />;

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <ListItem
            title={parseBriiskName(user.email)}
            subtitle={user.email}
            rightElement={rightElement}
            containerStyle={{ backgroundColor: color }}
        />
      </TouchableOpacity>
      <Divider />
    </View>
  );
};
