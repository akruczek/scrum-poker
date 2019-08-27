import { USER_ROLE } from '@core/models';
import { signIn, signInSuccess, signInError, signOut, signOutSuccess, signOutError } from './auth.actions';
import { authReducer } from './auth.reducers';

describe('Auth reducer', () => {
  let store: any = {};
  let payload: any;
  let action: any;

  beforeEach(() => {
    store = {
      isPending: false,
      model: {
        email: '',
        id: '',
        role: USER_ROLE.USER,
      },
      error: {},
    };
  });

  describe('when signInReducer was called', () => {    
    it('should replace isPending with true', () => {
      payload = {};
      action = signIn(payload);
      const newState = authReducer(store, action);

      expect(newState.isPending).toBeTruthy();
    });
  });

  describe('when signInSuccessReducer was called', () => {    
    it('should replace isPending with false and model with action payload', () => {
      payload = { key: 'some value' };
      action = signInSuccess(payload);
      const newState = authReducer(store, action);

      expect(newState.isPending)
        .toBeFalsy();
      expect(newState.model)
        .toEqual(payload);
    });
  });

  describe('when signInErrorReducer reducer was called', () => {    
    it('should replace isPending with false and error with action.payload', () => {
      payload = { code: '404' };
      action = signInError(payload);
      const newState = authReducer(store, action);

      expect(newState.isPending)
        .toBeFalsy();
      expect(newState.error)
        .toEqual(payload);
    });
  });

  describe('when signOutReducer was called', () => {    
    it('should replace isPending with true and model with empty object', () => {
      payload = {};
      action = signOut(payload);
      const newState = authReducer(store, action);

      expect(newState.isPending)
        .toBeTruthy();
      expect(newState.model)
        .toEqual({});
    });
  });

  describe('when signOutSuccessReducer was called', () => {    
    it('should replace isPending with true and model with empty object', () => {
      payload = {};
      action = signOutSuccess(payload);
      const newState = authReducer(store, action);

      expect(newState.isPending)
        .toBeFalsy();
      expect(newState.model)
        .toEqual({});
    });
  });

  describe('when signOutErrorReducer was called', () => {
    it('should replace isPending with true and model with action.payload', () => {
      payload = { code: '402' };
      action = signOutError(payload);
      const newState = authReducer(store, action);

      expect(newState.isPending)
        .toBeFalsy();
      expect(newState.error)
        .toEqual(payload);
    });
  });
});
