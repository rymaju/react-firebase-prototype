import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBkRndWZjrdG7iCK07mVTUvPXGja3v7jw4",
    authDomain: "prototype-54cc1.firebaseapp.com",
    projectId: "prototype-54cc1",
    storageBucket: "prototype-54cc1.appspot.com",
    messagingSenderId: "1091347591701",
    appId: "1:1091347591701:web:3fc74d2d2e6591cfc3d41c",
};

function initializeFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
}
export default initializeFirebase