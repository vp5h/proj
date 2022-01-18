// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCFEGJxtH3c9ksZ3fUCzkbwdwach8e4cbQ",
  authDomain: "taskmangement-3a12d.firebaseapp.com",
  projectId: "taskmangement-3a12d",
  storageBucket: "taskmangement-3a12d.appspot.com",
  messagingSenderId: "1087510956101",
  appId: "1:1087510956101:web:cd9e9c05f5f98eb017fb2c",
});

export const storage = firebaseConfig.storage()
export const auth = firebaseConfig.auth();
export const firestore = firebase.firestore();
export { firebaseConfig as firebase };
