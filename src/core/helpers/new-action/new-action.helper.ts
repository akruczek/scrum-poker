export const newAction = <T, P>(type: T) =>
  (payload?: P): { type: T, payload?: P } => ({ type, payload });
