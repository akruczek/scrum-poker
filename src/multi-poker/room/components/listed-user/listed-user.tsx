import * as React from 'react';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { parseName, isPresent } from '../../../../core/helpers';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';
import { Text } from '../../../../core/styled/text/text.styled';

interface Props {
  user: UserModel;
  room: RoomModel;
  onListItemPress: (user: UserModel) => void;
  email: string;
}

export const ListedUser = (props: Props) => {
  const { user, room, email } = props;

  const isValuePresent = isPresent(user.selectedValue);
  const isRoomDiscovered = R.propOr(false, 'discovered', room);
  const isCurrentUser = R.propEq('email', email, user);

  const icon = !isValuePresent
    ? 'live-help'
    : !isRoomDiscovered && !isCurrentUser && 'check' || 'help';

  const rightIcon = (!isRoomDiscovered && !isCurrentUser) || !isValuePresent
    ? { name: icon }
    : undefined;

  const rightElement = (isValuePresent && isRoomDiscovered) || (isValuePresent && isCurrentUser)
    ? <Text>{R.pathOr('?', [ 'selectedValue', 'label' ], user)}</Text>
    : undefined;

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => props.onListItemPress(user)}>
        <ListItem title={parseName(user.email)} subtitle={user.email} rightIcon={rightIcon} rightElement={rightElement} />
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );
};
