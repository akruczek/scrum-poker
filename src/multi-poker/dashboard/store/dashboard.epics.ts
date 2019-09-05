import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { Firebase } from '@core/services/firebase/firebase.service';
import { RoomModel } from '@core/models';
import {
  DASHBOARD_ACTIONS,
  addRoomError, addRoomSuccess, AddRoomAction,
  RemoveRoomAction, removeRoomSuccess, removeRoomError,
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
