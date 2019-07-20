export interface AuthStateModel {
  isPending: boolean;
  model: UserModel;
  error: {};
};

export interface UserModel {
  email: string;
}
