import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { pokers } from '@core/constants';
import { ListedUser } from './listed-user';

describe('ListedUser', () => {
  const user: any = {
    email: 'test@example.com',
    id: '1234',
    selectedValue: { value: 1, label: '1' },
    role: 'admin',
  };
  const room: any = {
    id: 1,
    name: 'room-1',
    description: 'this is room number 1',
    poker: pokers[0],
    users: [
      {
        email: 'test@example1.com',
      },
      {
        email: 'test@example2.com',
      },
    ],
    discovered: false,
  };
  const onListItemPress = jest.fn();
  const email = 'text@example.com';
  const estimations: any[] = [];

  describe('when ListedUser was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ListedUser {...{ user, room, onListItemPress, email, estimations }} />
    );

    it('should render ListItem component', () => {
      expect(wrapper.root.findByType(ListItem))
        .toBeTruthy();
    });

    it('should onListItemPress with given user email after press on ListItem', () => {
      act(() => {
        wrapper.root.findByType(TouchableOpacity).props.onPress();
      });

      expect(onListItemPress)
        .toHaveBeenCalledWith(user.email);
    });
  });
});
