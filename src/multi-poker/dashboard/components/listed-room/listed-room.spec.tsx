import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import Swipeable from 'react-native-swipeable-row';
import { pokers } from '@core/constants';
import { ListedRoom } from './listed-room';
import { Divider, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

describe('ListedRoom', () => {
  const room = {
    id: 'room-uuid',
    name: 'My Room',
    description: 'Super Room',
    users: {},
    discovered: false,
    allAdmins: true,
    poker: pokers[0],
  };

  const handleRemoveRoom = jest.fn();
  const handleNavigate = jest.fn();
  const setSwiping = jest.fn();

  describe('when ListedRoom was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ListedRoom
          room={room}
          isSwiping={false}
          handleRemoveRoom={handleRemoveRoom}
          handleNavigate={handleNavigate}
          setSwiping={setSwiping}
      />
    );

    it('should render Swipeable component', () => {
      expect(wrapper.root.findByType(Swipeable))
        .toBeTruthy();
    });

    it('should render Divider', () => {
      expect(wrapper.root.findByType(Divider))
        .toBeTruthy();
    });

    it('should render ListItem wrapped with TouchableOpacity component', () => {
      expect(wrapper.root.findByType(TouchableOpacity).findByType(ListItem))
        .toBeTruthy();
    });

    it('should call setSwiping prop with "true" after call Swipeable onSwipeStart prop', () => {
      act(() => {
        wrapper.root.findByType(Swipeable).props.onSwipeStart();
      });

      expect(setSwiping)
        .toHaveBeenCalledWith(true);
    });

    it('should call handleRemoveRoom with given room after call Swipeable onLeftActionRelease prop', () => {
      act(() => {
        wrapper.root.findByType(Swipeable).props.onLeftActionRelease();
      });

      expect(handleRemoveRoom)
        .toHaveBeenCalledWith(room);
    });

    it('should call handleNavigate with given room after press on TouchableOpacity', () => {
      act(() => {
        wrapper.root.findByType(TouchableOpacity).props.onPress();
      });

      expect(handleNavigate)
        .toHaveBeenCalledWith(room);
    });
  });

  describe('when ListedRoom was mounted with isSwiping "true"', () => {
    const wrapper = renderer.create(
      <ListedRoom
          room={room}
          isSwiping
          handleRemoveRoom={handleRemoveRoom}
          handleNavigate={handleNavigate}
          setSwiping={setSwiping}
      />
    );

    it('should render Swipeable with SwipeDeleteBar as leftContent with height equals to 80', () => {
      expect(wrapper.root.findByType(Swipeable).props.leftContent.props.height)
        .toEqual(80);
    });
  });

  describe('when ListedRoom was mounted with isSwiping "false"', () => {
    const wrapper = renderer.create(
      <ListedRoom
          room={room}
          isSwiping={false}
          handleRemoveRoom={handleRemoveRoom}
          handleNavigate={handleNavigate}
          setSwiping={setSwiping}
      />
    );

    it('should render Swipeable with SwipeDeleteBar as leftContent with 0 height', () => {
      expect(wrapper.root.findByType(Swipeable).props.leftContent.props.height)
        .toEqual(0);
    });
  });

  describe('when ListedRoom was mounted with room with description', () => {
    const wrapper = renderer.create(
      <ListedRoom
          room={room}
          isSwiping={false}
          handleRemoveRoom={handleRemoveRoom}
          handleNavigate={handleNavigate}
          setSwiping={setSwiping}
      />
    );

    it('should render ListItem with room description as subtitle prop', () => {
      expect(wrapper.root.findByType(ListItem).props.subtitle)
        .toEqual(room.description);
    });
  });

  describe('when ListedRoom was mounted with room without description', () => {
    const noDescriptionRoom: any = {
      id: 'room-uuid',
      name: 'My Room',
      users: {},
      discovered: false,
      allAdmins: true,
      poker: pokers[0],
    };

    const wrapper = renderer.create(
      <ListedRoom
          room={noDescriptionRoom}
          isSwiping={false}
          handleRemoveRoom={handleRemoveRoom}
          handleNavigate={handleNavigate}
          setSwiping={setSwiping}
      />
    );

    it('should render ListItem with room name as subtitle prop', () => {
      expect(wrapper.root.findByType(ListItem).props.subtitle)
        .toEqual(room.name);
    });
  });
});
