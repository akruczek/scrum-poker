import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { PokerCard } from '@core/models';
import { _cond } from '@core/helpers';
import { RoomModel, EDIT_ROOMS_TYPES } from '../../../models/room.models';
import { getNewEstimation, updateRoomProperties, getEstimationProposition } from '../../helpers';
import { SetValuePayload } from '../../../dashboard/store/dashboard.actions';
import { UserModel } from '../../../../auth/models/auth.models';
import { SelectCard } from '../../../dashboard/components/select-card/select-card';
import { JiraPusher } from '../jira-pusher/jira-pusher';
import { EditRoom } from '../../../dashboard/components/edit-room/edit-room';
import { updateRoom, setValue } from '../../../dashboard/store/dashboard.actions';

interface Props {
  isSelecting: boolean;
  room: RoomModel;
  user: UserModel;
  isJiraPusherVisible: boolean;
  isEditingRoom: boolean;
  setSelecting: (value: boolean) => void;
  setJiraPusherVisibility: (value: boolean) => void;
  setEditingRoom: (value: boolean) => void;
  handleReset: () => void;
}

interface DispatchProps {
  setValue: (payload: SetValuePayload) => void;
  updateRoom: (room: RoomModel) => void;
}

export const _RoomModals = ({
  isSelecting, room, user, isJiraPusherVisible, isEditingRoom,
  setSelecting, setJiraPusherVisibility, setEditingRoom, setValue, updateRoom, handleReset,
}: Props & DispatchProps) => {
  const handleSelectCard = (card: PokerCard) => {
    setSelecting(false);
    setValue(getNewEstimation(card, room.id, user.email));
  };

  const handleUpdateRoom = (newRoom: RoomModel) => {
    updateRoomProperties(newRoom, room)(updateRoom, setEditingRoom);
  };

  return _cond(
    isSelecting, (
      <SelectCard handleSelect={handleSelectCard} cards={room.poker.cards} />
    ),
    isJiraPusherVisible, (
      <JiraPusher
          handleClose={() => setJiraPusherVisibility(false)}
          handleReset={handleReset}
          estimationsList={getEstimationProposition(room.users)}
      />
    ),
    isEditingRoom, (
      <EditRoom
          type={EDIT_ROOMS_TYPES.UPDATE}
          handleSubmit={handleUpdateRoom}
          handleDismiss={() => setEditingRoom(false)}
          room={room}
      />
    ),
    R.T, null,
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { updateRoom, setValue },
  dispatch,
);

export const RoomModals = connect<any, DispatchProps, any>(
  null, mapDispatchToProps,
)(_RoomModals);
