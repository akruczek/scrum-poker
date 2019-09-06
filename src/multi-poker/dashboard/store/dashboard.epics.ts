import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, pluck } from 'rxjs/operators';
import { Firebase } from '@core/services/firebase/firebase.service';
import { RoomModel, UserModel } from '@core/models';
import { AppState } from '../../../store/reducers';
import { filterUsers } from '../helpers/filter-users/filter-users.helper';
import {
  DASHBOARD_ACTIONS,
  addRoomError, addRoomSuccess, AddRoomAction,
  RemoveRoomAction, removeRoomSuccess, removeRoomError,
  resetUsersSuccess, resetUsersError, ResetUsersAction,
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

const resetUsers = (roomId: string, users: {[key: string]: UserModel}) => Firebase
  .post(`/rooms/${roomId}/users`, users)
  .then(response => resetUsersSuccess(response))
  .catch(resetUsersError);

export const resetUsersEpic = (action: ActionsObservable<ResetUsersAction>, state: { value: AppState }) => action
  .pipe(
    ofType(DASHBOARD_ACTIONS.RESET_USERS),
    pluck('payload'),
    switchMap((id: string) => resetUsers(id, filterUsers(state.value))),
  );
