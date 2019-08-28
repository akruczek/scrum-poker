import * as React from 'react';
import { RoomModel } from '@core/models';

type ReturnType = [
  boolean,
  (value: boolean) => void,
  (room: RoomModel) => void,
];

export const useRemoveRoom = (
  removeRoom: (id: string) => void,
): ReturnType => {
  const [ isSwiping, setSwiping ] = React.useState(false);

  const handleRemoveRoom = (room: RoomModel) => {
    removeRoom(room.id);
  };

  return [ isSwiping, setSwiping, handleRemoveRoom ];
};
