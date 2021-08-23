import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
   apiKey: "AIzaSyCeXEBbPWGiOgukr8vkwhsYHv4SbhIIfrw",
   authDomain: "react-app-5767e.firebaseapp.com",
   projectId: "react-app-5767e",
   storageBucket: "react-app-5767e.appspot.com",
   messagingSenderId: "709098370692",
   appId: "1:709098370692:web:6171e0331cd2a708e9f4d1"
};

// Initialize Firebase
// Base de datos
firebase.initializeApp(firebaseConfig);

// La referencia a firestore (La base de datos de firebase)
const db = firebase.firestore();

// Este es mi auth provider para hacer autenticación con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
   db,
   googleAuthProvider,
   firebase
}
