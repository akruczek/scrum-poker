import { Action } from 'redux';

export enum FIREBASE_ACTIONS {
  SET_ACCESS = '[Firebase]: Set firebase access',
}

export interface SetFirebaseAccessAction extends Action {
  payload: boolean;
}

export type FirebaseActions = SetFirebaseAccessAction;

const newAction = <P>(type: FIREBASE_ACTIONS) =>
  (payload?: P): { type: FIREBASE_ACTIONS, payload?: P } => ({ type, payload });

export const setFirebaseAccess = newAction<boolean>(FIREBASE_ACTIONS.SET_ACCESS);
