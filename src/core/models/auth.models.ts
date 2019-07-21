import { PokerCard } from '../../single-poker/models/poker-card.models';

export interface AuthStateModel {
  isPending: boolean;
  model: UserModel;
  error: {};
};

export interface UserModel {
  email: string;
  selectedValue?: PokerCard | null;
}
