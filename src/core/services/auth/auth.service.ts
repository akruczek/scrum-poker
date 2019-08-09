import { Storage } from '../device-storage/device-storage.service';
import { appStore } from '../../../store/configure-store';
import { AUTH_ACTIONS } from '../../../auth/store/auth.actions';

export const AuthService = {
  initialize: () => {
    const action = (payload: string) => ({ type: AUTH_ACTIONS.SIGN_IN, payload });

    return Storage
      .get('userEmail')
      .then(payload => payload ? appStore.dispatch(action(payload)) : {});
  },
};
