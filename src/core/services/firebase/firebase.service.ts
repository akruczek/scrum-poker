import * as firebase from "firebase";
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_STORAGE_BUCKET } from 'react-native-dotenv';

export class Firebase {
  static initialize() {
    firebase.initializeApp({
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
      storageBucket: FIREBASE_STORAGE_BUCKET,
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

  static listen(path: string, callback?: (data: any) => void) {
    firebase
      .database()
      .ref(path)
      .on('value', snapshot => callback ? callback(snapshot.val()) : snapshot.val());
  }
}
