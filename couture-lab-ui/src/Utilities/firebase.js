// Needs to be firebase/compat/app to remove Module not found: Error: Package path . is not exported from package
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';

// Initialize firebase app using firebase config
const FirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCHCmhwEsBJVMmVYbPBLAGd-65UjnoAxmI",
    authDomain: "couturelab-a79f5.firebaseapp.com",
    databaseURL: "https://couturelab-a79f5-default-rtdb.firebaseio.com",
    projectId: "couturelab-a79f5",
    storageBucket: "couturelab-a79f5.appspot.com",
    messagingSenderId: "295899864295",
    appId: "1:295899864295:web:845096e7863b08512d9642",
    measurementId: "G-D2TE02N8JJ"
})

export const auth = FirebaseApp.auth();
export default FirebaseApp;