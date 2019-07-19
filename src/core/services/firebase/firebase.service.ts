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

  static signIn(email: string, password: string, callback?: (data: any) => void) {
    const callCallback = (response: any) => {
      if (callback) {
        callback({
          email: response.user.email,
        });
      }
    };

    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(callCallback)
      .catch((error: any) => {
        if (error.code === 'auth/user-not-found') {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response: any) => {
              firebase.auth().signInWithEmailAndPassword(response.user.email, password)
                .then(callCallback);
            });
        }
      });
  }

  static post(path: string, data: {[key: string]: any}) {
    firebase.database().ref(path).set(data);
  }
}
