import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { RoomModel } from '../../models/room.models';
import { Firebase } from '../../../core/services/firebase/firebase.service';
import {
  DASHBOARD_ACTIONS,
  addRoomError, addRoomSuccess, AddRoomAction,
  RemoveRoomAction, removeRoomSuccess, removeRoomError, AddUserAction, AddUserPayload, addUserSuccess, addUserError, RoomAction, RoomPayload, showDownSuccess, showDownError, resetSuccess, resetError, SetValueAction, SetValuePayload, setValueSuccess, setValueError,
} from './dashboard.actions';
import { EMPTY_ACTION } from '../../../core/constants/store';

const addRoom = (payload: { room: RoomModel, index: number }) => Firebase
  .post(`/rooms/${payload.index}`, payload.room)
  .then(rooms => addRoomSuccess(rooms))
  .catch(addRoomError)

export const addRoomEpic = (action: ActionsObservable<AddRoomAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.ADD_ROOM),
    pluck('payload'),
    switchMap(addRoom),
  );

const removeRoom = (id: number) => Firebase
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
  .post(`/rooms/${payload.roomIndex}/users/${payload.index}`, payload.user)
  .then(response => addUserSuccess(response))
  .catch(addUserError);

export const addUserEpic = (action: ActionsObservable<AddUserAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.ADD_USER),
    pluck('payload'),
    switchMap(addUser)
  );

const showDown = (payload: RoomPayload) => Firebase
  .post(`/rooms/${payload.index}`, { ...payload.room, discovered: true })
  .then(response => showDownSuccess(response))
  .catch(showDownError);

export const showDownEpic = (action: ActionsObservable<RoomAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.SHOW_DOWN),
    pluck('payload'),
    switchMap(showDown),
  );

const reset = (payload: RoomPayload) => Firebase
  .post(`/rooms/${payload.index}`, payload.room)
  .then(response => resetSuccess(response))
  .catch(resetError);

export const resetEpic = (action: ActionsObservable<RoomAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.RESET),
    pluck('payload'),
    switchMap(reset),
  );

const setValue = (payload: SetValuePayload) => Firebase
  .post(`/rooms/${payload.roomIndex}/users/${payload.userIndex}/selectedValue`, payload.value)
  .then(response => setValueSuccess(response))
  .catch(setValueError);

export const setValueEpic = (action: ActionsObservable<SetValueAction>) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.SET_VALUE),
    pluck('payload'),
    switchMap(setValue),
  );
