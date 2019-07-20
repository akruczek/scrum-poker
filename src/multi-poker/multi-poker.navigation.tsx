import { createStackNavigator } from 'react-navigation';
import { Room } from './room/room';

export const RoomNavigation = createStackNavigator({
  'room': Room,
});

RoomNavigation.navigationOptions = {
  tabBarLabel: 'Room',
};
