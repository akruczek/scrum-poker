import * as firebase from 'firebase';
import { hideWarnings } from '../../helpers/hide-warnings/hide-warnings.helper';
import env from '../../constants/env';

export class Firebase {
  static initialize() {
    hideWarnings();
    firebase.initializeApp({
      apiKey: env.FIREBASE_API_KEY,
      authDomain: env.FIREBASE_AUTH_DOMAIN,
      databaseURL: env.FIREBASE_DATABASE_URL,
      storageBucket: env.FIREBASE_STORAGE_BUCKET,
    });
  }

  static signIn(email: string, password: string): any {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((signInResponse: any) => ({ email: signInResponse.user.email }))
      .catch((error: any): any => error.code !== 'auth/user-not-found' ? null :
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((response: any) => firebase
            .auth()
            .signInWithEmailAndPassword(response.user.email, password)
            .then((signUpResponse: any) => ({ email: signUpResponse.user.email }))
          )
      );
  }

  static post(path: string, data: {[key: string]: any} | null, callback?: (data: any) => void) {
    return firebase
      .database()
      .ref(path)
      .set(data)
      .then(snapshot => callback ? callback(snapshot.val()) : snapshot.val());
  }

  static get(path: string, callback?: (data: any) => void) {
    firebase
      .database()
      .ref(path)
      .once('value')
      .then(snapshot => callback ? callback(snapshot.val()) : snapshot.val());
  }

  static delete(path: string) {
    return this.post(path, null);
  }

  static subscribe(path: string, callback?: (data: any) => void) {
    firebase
      .database()
      .ref(path)
      .on('value', snapshot => callback ? callback(snapshot.val()) : snapshot.val());
  }

  static unsubscribe(path: string, callback?: (data: any) => void) {
    firebase
      .database()
      .ref(path)
      .off('value', snapshot => callback ? callback(snapshot.val()) : snapshot.val());
  }
}
