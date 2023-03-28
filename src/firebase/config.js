import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFXdN6ZVo5JewToClT6spqXWS_91d2fPE",
  authDomain: "project-management-a301e.firebaseapp.com",
  projectId: "project-management-a301e",
  storageBucket: "project-management-a301e.appspot.com",
  messagingSenderId: "602248374026",
  appId: "1:602248374026:web:f689e244fd0056700f3cf3",
};

//   init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp };
