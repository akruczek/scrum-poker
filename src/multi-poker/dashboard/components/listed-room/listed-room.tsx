import * as React from 'react';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import { ListItem, Divider } from 'react-native-elements';
import { SwipeDeleteBar } from '../swipe-delete-bard/swipe-delete-bar';
import { RoomModel } from '../../../models/room.models';

interface Props {
  room: RoomModel;
  isSwiping: boolean;
  handleRemoveRoom: (room: RoomModel) => void;
  handleNavigate: (room: RoomModel) => void;
  setSwiping: (value: boolean) => void;
}

export const ListedRoom = (props: Props) => {
  const { room, isSwiping } = props;
  const swipeHeight = isSwiping ? 80 : 0;

  return (
    <React.Fragment key={room.id}>
      <Swipeable
          onSwipeStart={() => props.setSwiping(true)}
          leftContent={<SwipeDeleteBar height={swipeHeight} />}
          leftActionActivationDistance={200}
          onLeftActionRelease={() => props.handleRemoveRoom(room)}
      >
        <TouchableOpacity onPress={() => props.handleNavigate(room)}>
          <ListItem
              title={room.name}
              subtitle={R.propOr(room.name, 'description', room)}
              rightIcon={{ name: 'arrow-forward' }}
              containerStyle={{ height: 80 }}
          />
        </TouchableOpacity>
      </Swipeable>
      <Divider />
    </React.Fragment>
  );
};
