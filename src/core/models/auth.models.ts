export interface AuthStateModel {
  isPending: boolean;
  model: UserModel;
};

export interface UserModel {
  email: string;
}
