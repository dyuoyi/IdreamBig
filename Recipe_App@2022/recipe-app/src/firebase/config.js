import firebase from 'firebase/app';
import 'firebase/firestore';  // importing the firestore service
import 'firebase/auth';        // importing the auth service
import 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsX3_LW3o_jgoFgNJpdgXt6rjCSirT84s",
  authDomain: "letuscookapp.firebaseapp.com",
  projectId: "letuscookapp",
  storageBucket: "letuscookapp.appspot.com",
  messagingSenderId: "755720902353",
  appId: "1:755720902353:web:b2a9171ee1a8ebc5bb57f0"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp }