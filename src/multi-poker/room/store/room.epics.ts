import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { Firebase } from '@core/services/firebase/firebase.service';
import { RoomModel } from '@core/models';
import {
  ROOM_ACTIONS, RoomAction, RoomActions,
  AddUserAction, AddUserPayload, addUserSuccess, addUserError,
  showDownSuccess, showDownError, resetSuccess, resetError,
  SetValueAction, SetValuePayload, setValueSuccess, setValueError,
  updateRoomSuccess, updateRoomError,
} from './room.actions';

const addUser = (payload: AddUserPayload) => Firebase
  .post(`/rooms/${payload.roomId}/users/${payload.user.id}`, payload.user)
  .then(response => addUserSuccess(response))
  .catch(addUserError);

export const addUserEpic = (action: ActionsObservable<AddUserAction>) => action
  .pipe(
    ofType(ROOM_ACTIONS.ADD_USER),
    pluck('payload'),
    switchMap(addUser)
  );

const showDown = (room: RoomModel) => Firebase
  .post(`/rooms/${room.id}`, { ...room, discovered: true })
  .then(response => showDownSuccess(response))
  .catch(showDownError);

export const showDownEpic = (action: ActionsObservable<RoomAction>) => action
  .pipe(
    ofType(ROOM_ACTIONS.SHOW_DOWN),
    pluck('payload'),
    switchMap(showDown),
  );

const reset = (room: RoomModel) => Firebase
  .post(`/rooms/${room.id}`, room)
  .then(response => resetSuccess(response))
  .catch(resetError);

export const resetEpic = (action: ActionsObservable<RoomAction>) => action
  .pipe(
    ofType(ROOM_ACTIONS.RESET),
    pluck('payload'),
    switchMap(reset),
  );

const setValue = (payload: SetValuePayload) => Firebase
  .post(`/rooms/${payload.roomId}/users/${payload.userId}/selectedValue`, payload.value)
  .then(response => setValueSuccess(response))
  .catch(setValueError);

export const setValueEpic = (action: ActionsObservable<SetValueAction>) => action
  .pipe(
    ofType(ROOM_ACTIONS.SET_VALUE),
    pluck('payload'),
    switchMap(setValue),
  );

const updateRoom = (room: RoomModel) => Firebase
  .post(`/rooms/${room.id}`, room)
  .then(rooms => updateRoomSuccess(rooms))
  .catch(updateRoomError);

export const updateRoomEpic = (action: ActionsObservable<RoomActions>) => action
  .pipe(
    ofType(ROOM_ACTIONS.UPDATE_ROOM),
    pluck('payload'),
    switchMap(updateRoom),
  );
