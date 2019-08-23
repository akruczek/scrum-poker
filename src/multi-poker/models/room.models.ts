import { PokerModel } from '@core/models';
import { UserModel } from '../../auth/models/auth.models';

export enum EDIT_ROOMS_TYPES {
  CREATE = 'create',
  UPDATE = 'update',
}

export interface RoomsStateModel {
  models: { [key: string]: RoomModel };
  model: RoomModel | {};
}

export interface RoomModel {
  id: string;
  name: string;
  description: string;
  users: { [key: string]: UserModel };
  discovered?: boolean;
  allAdmins: boolean;
  poker: PokerModel;
  projectKey: string;
}
