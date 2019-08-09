import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { Firebase } from '@core/services/firebase/firebase.service';
import { RoomModel } from '../../models/room.models';
import {
  DASHBOARD_ACTIONS,
  addRoomError, addRoomSuccess, AddRoomAction,
  RemoveRoomAction, removeRoomSuccess, removeRoomError,
  AddUserAction, AddUserPayload, addUserSuccess, addUserError,
  RoomAction, showDownSuccess, showDownError,
  resetSuccess, resetError,
  SetValueAction, SetValuePayload, setValueSuccess, setValueError,
  SetRoomAction, updateRoomSuccess,
} from './dashboard.actions';

const addRoom = (room: RoomModel) => Firebase
  .post(`/rooms/${room.id}`, room)
  .then(rooms => addRoomSuccess(rooms))
  .catch(addRoomError)

export const addRoomEpic = (action: ActionsObservable<AddRoomAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.ADD_ROOM),
    pluck('payload'),
    switchMap(addRoom),
  );

const removeRoom = (id: string) => Firebase
  .delete(`/rooms/${id}`)
  .then(rooms => removeRoomSuccess(rooms))
  .catch(removeRoomError);

export const removeRoomEpic = (action: ActionsObservable<RemoveRoomAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.REMOVE_ROOM),
    pluck('payload'),
    switchMap(removeRoom),
  );

const addUser = (payload: AddUserPayload) => Firebase
  .post(`/rooms/${payload.roomId}/users/${payload.user.id}`, payload.user)
  .then(response => addUserSuccess(response))
  .catch(addUserError);

export const addUserEpic = (action: ActionsObservable<AddUserAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.ADD_USER),
    pluck('payload'),
    switchMap(addUser)
  );

const showDown = (room: RoomModel) => Firebase
  .post(`/rooms/${room.id}`, { ...room, discovered: true })
  .then(response => showDownSuccess(response))
  .catch(showDownError);

export const showDownEpic = (action: ActionsObservable<RoomAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.SHOW_DOWN),
    pluck('payload'),
    switchMap(showDown),
  );

const reset = (room: RoomModel) => Firebase
  .post(`/rooms/${room.id}`, room)
  .then(response => resetSuccess(response))
  .catch(resetError);

export const resetEpic = (action: ActionsObservable<RoomAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.RESET),
    pluck('payload'),
    switchMap(reset),
  );

const setValue = (payload: SetValuePayload) => Firebase
  .post(`/rooms/${payload.roomId}/users/${payload.userId}/selectedValue`, payload.value)
  .then(response => setValueSuccess(response))
  .catch(setValueError);

export const setValueEpic = (action: ActionsObservable<SetValueAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.SET_VALUE),
    pluck('payload'),
    switchMap(setValue),
  );

const updateRoom = (room: RoomModel) => Firebase
  .post(`/rooms/${room.id}`, room)
  .then(rooms => updateRoomSuccess(rooms))
  .catch(addRoomError);

export const updateRoomEpic = (action: ActionsObservable<SetRoomAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.UPDATE_ROOM),
    pluck('payload'),
    switchMap(updateRoom),
  );
