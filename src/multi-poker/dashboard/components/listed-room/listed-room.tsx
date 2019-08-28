import * as React from 'react';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import { ListItem, Divider } from 'react-native-elements';
import { RoomModel } from '@core/models';
import { SwipeDeleteBar } from '../swipe-delete-bard/swipe-delete-bar';
import { ListedRoomIcon } from '../listed-room-icon/listed-room-icon';

interface Props {
  room: RoomModel;
  isSwiping: boolean;
  handleRemoveRoom: (room: RoomModel) => void;
  handleNavigate: (room: RoomModel) => void;
  setSwiping: (value: boolean) => void;
}

export const ListedRoom = ({
  room, isSwiping, handleRemoveRoom, handleNavigate, setSwiping,
}: Props) => (
  <React.Fragment key={room.id}>
    <Swipeable
        onSwipeStart={() => setSwiping(true)}
        leftContent={<SwipeDeleteBar height={isSwiping ? 80 : 0} />}
        leftActionActivationDistance={200}
        onLeftActionRelease={() => handleRemoveRoom(room)}
    >
      <TouchableOpacity onPress={() => handleNavigate(room)}>
        <ListItem
            title={room.name}
            subtitle={R.propOr(room.name, 'description', room)}
            rightIcon={{ name: 'arrow-forward' }}
            leftElement={<ListedRoomIcon icon={room.poker.icon} />}
            containerStyle={{ height: 80 }}
        />
      </TouchableOpacity>
    </Swipeable>
    <Divider />
  </React.Fragment>
);
