import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config= {
    apiKey: "AIzaSyB56v1Bqwowex9WHaObakOi5H-PmQRCRSQ",
    authDomain: "crwn-db-39863.firebaseapp.com",
    databaseURL: "https://crwn-db-39863.firebaseio.com",
    projectId: "crwn-db-39863",
    storageBucket: "",
    messagingSenderId: "3226407240",
    appId: "1:3226407240:web:2c783fbfe0547a8a20237d",
    measurementId: "G-3D3ZGHVEWD"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


