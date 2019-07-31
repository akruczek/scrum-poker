import { PokerCard } from '@core/models';

export interface AuthStateModel {
  isPending: boolean;
  model: UserModel;
  error: {};
}

export interface UserModel {
  email: string;
  selectedValue?: PokerCard | null;
}

export enum AUTH_TYPES {
  JOIN = 'join',
  LOGIN = 'login',
}
