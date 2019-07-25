import * as React from 'react';
import * as R from 'ramda';
import { ListItem, Divider } from 'react-native-elements';
import { View } from 'react-native';
import { parseName, isPresent, NOOP } from '../../../../core/helpers';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';
import { TouchableListItem } from '../../styled/touchable-list-item/touchable-list-item';
import { COLORS } from '../../../../core/constants/colors';
import { ListedUserIcon } from '../listed-user-icon/listed-user-icon';
import { CardIcon } from '../../../../core/components/card-icon/card-icon';

interface Props {
  user: UserModel;
  room: RoomModel;
  onListItemPress: (user: UserModel) => void;
  email: string;
  estimations: (number|string)[] | null;
}

export const ListedUser = (props: Props) => {
  const { user, room, email } = props;

  const isValuePresent = isPresent(user.selectedValue);
  const isRoomDiscovered = R.propOr(false, 'discovered', room);
  const isCurrentUser = R.propEq('email', email, user);

  // TODO get backgroundColor based on estimations (max, min, ?)

  const icon = !isValuePresent
    ? 'live-help'
    : !isRoomDiscovered && !isCurrentUser && 'check' || 'help';

  const selectedValue = R.pathOr('?', [ 'selectedValue', 'label' ], user);

  const handlePress = () => {
    props.onListItemPress(user);
  };

  const rightElement = (isValuePresent && isRoomDiscovered) || (isValuePresent && isCurrentUser)
    ? <CardIcon value={selectedValue} handlePress={handlePress} />
    : <ListedUserIcon isCurrentUser={isCurrentUser} icon={icon} />;

  return (
    <View>
      <TouchableListItem onPress={handlePress} color={isValuePresent ? COLORS.GREEN_OPACITY : COLORS.WHITE}>
        <ListItem title={parseName(user.email)} subtitle={user.email} rightElement={rightElement} />
      </TouchableListItem>
      <Divider />
    </View>
  );
};
