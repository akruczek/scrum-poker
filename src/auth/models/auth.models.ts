import { PokerCard } from '@core/models';
import { USER_ROLE } from '../../core/models/user.models';

export interface AuthStateModel {
  isPending: boolean;
  model: UserModel;
  error: {};
}

export interface UserModel {
  email: string;
  selectedValue?: PokerCard | null;
  role: USER_ROLE;
}

export enum AUTH_TYPES {
  JOIN = 'join',
  LOGIN = 'login',
}
