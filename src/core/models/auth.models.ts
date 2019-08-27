import { PokerCard } from './poker-card.models';
import { USER_ROLE } from './user.models';

export interface AuthStateModel {
  isPending: boolean;
  model: UserModel;
  error: {};
}

export interface UserModel {
  email: string;
  id: string;
  selectedValue?: PokerCard | null;
  role: USER_ROLE;
}

export enum AUTH_TYPES {
  JOIN = 'join',
  LOGIN = 'login',
}
