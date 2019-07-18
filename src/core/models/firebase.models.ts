export interface FirebaseStateModel {
  isPending: boolean;
  model: {
    token: string | null;
  };
}