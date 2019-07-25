import * as React from 'react';
import * as R from 'ramda';
import { ListItem, Divider } from 'react-native-elements';
import { View } from 'react-native';
import { parseName, isPresent, isBlank } from '../../../../core/helpers';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';
import { TouchableListItem } from '../../styled/touchable-list-item/touchable-list-item';
import { ListedUserIcon } from '../listed-user-icon/listed-user-icon';
import { CardIcon } from '../../../../core/components/card-icon/card-icon';
import { getListedUserColor } from '../../helpers/get-listed-user-color/get-listed-user-color.helper';
import { isDivergence } from '../../helpers/is-divergence/is-divergence.helper';
import { isEqualDivergence } from '../../helpers/is-equal-divergence/is-equal-divergence.helper';
import { getListedUserIcon } from '../../helpers/get-listed-user-icon/get-listed-user-icon.helper';

interface Props {
  user: UserModel;
  room: RoomModel;
  onListItemPress: (user: UserModel) => void;
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
    props.onListItemPress(user);
  };

  const color = getListedUserColor(
    isRoomDiscovered, isDivergence(estimations), isEqualDivergence(selectedValue)(estimations), isValuePresent, selectedValue,
  );

  const rightElement = (isValuePresent && isRoomDiscovered) || (isValuePresent && isCurrentUser)
    ? <CardIcon value={selectedLabel} handlePress={handlePress} />
    : <ListedUserIcon isCurrentUser={isCurrentUser} icon={icon} />;

  return (
    <View>
      <TouchableListItem onPress={handlePress} color={color}>
        <ListItem title={parseName(user.email)} subtitle={user.email} rightElement={rightElement} />
      </TouchableListItem>
      <Divider />
    </View>
  );
};
