import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import {
  DASHBOARD_ACTIONS,
  addRoomError, addRoomSuccess, AddRoomAction,
  RemoveRoomAction, removeRoomSuccess, removeRoomError, AddUserAction, AddUserPayload, addUserSuccess, addUserError,
} from './dashboard.actions';
import { RoomModel } from '../../models/room.models';
import { Firebase } from '../../../core/services/firebase/firebase.service';
import { UserModel } from '../../../core/models/auth.models';

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
