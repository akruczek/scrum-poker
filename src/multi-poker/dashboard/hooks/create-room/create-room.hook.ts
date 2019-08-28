import * as React from 'react';
import { RoomModel } from '@core/models';
import { SCREENS } from '@core/navigation/screens';
import { addNewRoom } from '../../helpers/add-new-room/add-new-room.helper';
import { joinRoom } from '../../helpers/join-room/join-room.helper';

type ReturnType = [
  boolean,
  (value: boolean) => void,
  (room: RoomModel) => void,
  (room: RoomModel) => void,
];

export const useCreateRoom = (
  addRoom: (payload: RoomModel) => void,
  setRoom: (room: RoomModel) => void,
  navigate: (screen: SCREENS) => void,
): ReturnType => {
  const [ isCreatingRoom, setCreateRoom ] = React.useState(false);

  const handleNavigate = (room: RoomModel) => {
    joinRoom(setRoom, navigate, room);
  }

  const handleAddRoom = (room: RoomModel) => {
    addNewRoom(room)(setCreateRoom, handleNavigate, addRoom);
  };

  return [ isCreatingRoom, setCreateRoom, handleNavigate, handleAddRoom ];
};
