import { Firebase } from './firebase.service';
import firebase from 'firebase';

// TODO: test all methods

describe('Firebase', () => {
  describe('when Firebase.initialize was called', () => {
    beforeEach(() => {
      spyOn(firebase, 'initializeApp');
      Firebase.initialize();
    });

    it('should call Firebase.initializeApp with Firebase config', () => {
      expect(firebase.initializeApp).toHaveBeenCalled();
    });
  });

  describe('when Firebase.sign was called', () => {
    beforeEach(() => {
      spyOn(firebase, 'auth').and.returnValue({
        signInWithEmailAndPassword: (email: string, _: string) => new Promise(() => ({ user: { email } })),
      });
    });

    describe('and user with given email exists', () => {
      const email = 'test@example.com';

      it('should return user entity', () => {
        Firebase.signIn(email, 'password').then((response: any) => {
          expect(response).toEqual(email);
        });
      });
    });
  });
});
