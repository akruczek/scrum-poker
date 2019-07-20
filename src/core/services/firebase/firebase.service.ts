import * as firebase from "firebase";

export class Firebase {
  static initialize() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAamD-D95QmqIlgH5FftPgnsOAoZHTaP7g',
      authDomain: "scrum-poker-f91ed.firebaseapp.com",
      databaseURL: "https://scrum-poker-f91ed.firebaseio.com",
      storageBucket: "scrum-poker-f91ed.appspot.com"
    });
  }

  static signIn(email: string, password: string): any {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((signInResponse: any) => ({ email: signInResponse.user.email }))
      .catch((error: any) => {
        if (error.code === 'auth/user-not-found') {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response: any) => {
              firebase.auth().signInWithEmailAndPassword(response.user.email, password)
                .then((signUpResponse: any) => ({ email: signUpResponse.user.email }));
            });
        }
      });
  }

  static post(path: string, data: {[key: string]: any}, callback?: (data: any) => void) {
    firebase
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

  static listen(path: string, callback?: (data: any) => void) {
    firebase
      .database()
      .ref(path)
      .on('value', snapshot => callback ? callback(snapshot.val()) : snapshot.val());
  }
}
