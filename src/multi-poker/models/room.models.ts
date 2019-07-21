import { UserModel } from '../../core/models/auth.models';

export interface RoomsStateModel {
  models: RoomModel[];
  model: RoomModel | {};
}

export interface RoomModel {
  id: number;
  name: string;
  users: UserModel[];
}