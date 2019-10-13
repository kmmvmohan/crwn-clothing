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

  export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //check whether the user data exists
    const snapShot = await userRef.get();

    //if the user data doesn't exists create a user in our database
    if(!snapShot.exists){
      const {displayName, email }= userAuth; //destructing
      const createdAt = new Date();

      try{
        //create user on the database using set (create Method)  becuase userref is a document object
        await userRef.set({ 
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
          console.log('error creating user', error.message);
      }

    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


