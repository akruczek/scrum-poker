import { UserModel } from '../../core/models/auth.models';

export enum EDIT_ROOMS_TYPES {
  CREATE = 'create',
  UPDATE = 'update',
}

export interface RoomsStateModel {
  models: RoomModel[];
  model: RoomModel | {};
}

export interface RoomModel {
  id: number;
  name: string;
  description: string;
  users: UserModel[];
  discovered?: boolean;
}