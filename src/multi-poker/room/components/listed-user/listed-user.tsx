import * as React from 'react';
import { ListItem, Divider } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { parseEmailToName } from '@core/helpers';
import { UserModel, RoomModel } from '@core/models';
import { Text } from '@core/styled';
import { getListedUserColor, getListedUserValues, getListedUserProperties } from '../../helpers';
import { ListedUserEstimation } from '../listed-user-estimation/listed-user-estimation';

interface Props {
  user: UserModel;
  room: RoomModel;
  onListItemPress: (email: string) => void;
  email: string;
  estimations: number[] | null;
}

export const ListedUser = ({ user, room, email, estimations, onListItemPress }: Props) => {
  const [ selectedValue, selectedLabel ] = getListedUserValues(user);
  const [ isValuePresent, isRoomDiscovered, isCurrentUser, icon ] = getListedUserProperties(room, user, email);

  const handlePress = () => {
    onListItemPress(user.email);
  };

  const color = getListedUserColor(isRoomDiscovered, estimations || [], selectedValue, isValuePresent);

  const listedUserEstimationProps = {
    isValuePresent, isRoomDiscovered, isCurrentUser, selectedLabel, selectedValue, handlePress, icon,
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <ListItem
            title={<Text children={parseEmailToName(user.email)} />}
            subtitle={<Text children={user.email} />}
            rightElement={<ListedUserEstimation {...listedUserEstimationProps} />}
            containerStyle={{ backgroundColor: color }}
        />
      </TouchableOpacity>
      <Divider />
    </View>
  );
};
