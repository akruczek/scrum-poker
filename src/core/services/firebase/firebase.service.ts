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

  static signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static post(path: string, data: {[key: string]: any}) {
    firebase.database().ref(path).set(data);
  }
}
