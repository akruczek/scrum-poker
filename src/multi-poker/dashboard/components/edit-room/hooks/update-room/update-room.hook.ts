import * as React from 'react';
import { EDIT_ROOMS_TYPES, RoomModel } from '../../../../../models/room.models';
import { PokerModel } from '../../../../../../core/models';

export const useUpdateRoom = (
  type: EDIT_ROOMS_TYPES,
  room?: RoomModel,
) => (
  setName: (name: string) => void,
  setDescription: (description: string) => void,
  setProjectKey: (projectKey: string) => void,
  setAllAdmins: (allAdmins: boolean) => void,
  setPoker: (poker: PokerModel) => void,
) => {
  React.useEffect(() => {
    if (type === EDIT_ROOMS_TYPES.UPDATE && room) {
      setName(room.name);
      setDescription(room.description);
      setProjectKey(room.projectKey);
      setAllAdmins(room.allAdmins);
      setPoker(room.poker);
    }
  }, []);
};


