import * as React from 'react';
import { Firebase } from '@core/services/firebase/firebase.service';
import { RoomModel } from '../../../models/room.models';

export const useSubscribeRooms = (setRooms: (room: RoomModel[]) => void) => {
  const [ isPending, setPending ] = React.useState(false);

  const updateRooms = (rooms: RoomModel[]) => {
    setRooms(rooms);
    setPending(false);
  };

  React.useEffect(() => {
    setPending(true);
    Firebase.subscribe('/rooms', updateRooms);

    return () => {
      Firebase.unsubscribe('/rooms');
    };
  }, []);

  return isPending;
};
