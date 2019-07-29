import { appStore } from '../../../store/configure-store';
import { AuthService } from './auth.service';
import { Storage } from '../device-storage/device-storage.service';
import { AUTH_ACTIONS } from '../../../auth/store/auth.actions';

describe('AuthService', () => {
  describe('when AuthService.initialize was called', () => {
    const action = { type: AUTH_ACTIONS.SIGN_IN, payload: 'user@example.com' };

    beforeEach(() => {
      spyOn(appStore, 'dispatch');
    });

    describe('and userEmail is saved in device storage', () => {
      beforeEach(() => {
        spyOn(Storage, 'get').and.returnValue(
          new Promise(() => appStore.dispatch(action))
        );
        AuthService.initialize();
      });
      
      it('should call signIn action with userEmail from device storage', () => {
        expect(appStore.dispatch)
          .toHaveBeenCalledWith(action);
      });
    });

    describe('and userEmail is not saved in device storage', () => {
      beforeEach(() => {
        spyOn(Storage, 'get').and.returnValue(
          new Promise(() => appStore.dispatch({} as any))
        );
      });

      it('should call signIn action with empty object', () => {
        expect(appStore.dispatch)
          .toHaveBeenCalledWith({});
      });
    });
  });  
});
