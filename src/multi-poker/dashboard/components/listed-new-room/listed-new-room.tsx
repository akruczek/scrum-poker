import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

interface Props {
  toggleCreateRoom: (value?: boolean) => void;
}

export const ListedNewRoom = (props: Props) => (
  <>
    <TouchableOpacity onPress={() => props.toggleCreateRoom(true)}>
      <ListItem
          title="Add Room"
          subtitle="Add new Room"
          rightIcon={{ name: 'add' }}
      />
    </TouchableOpacity>
    <Divider />
  </>
)
