// Needs to be firebase/compat/app to remove Module not found: Error: Package path . is not exported from package
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
//import { getAnalytics } from "firebase/analytics";

// Initialize firebase app using firebase config
const FirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAo_5IXL06BD9JLRl_6veOa4pmZ97rKLKY",
    authDomain: "couture-lab-backend.firebaseapp.com",
    databaseURL: "https://couture-lab-backend-default-rtdb.firebaseio.com",
    projectId: "couture-lab-backend",
    storageBucket: "couture-lab-backend.appspot.com",
    messagingSenderId: "515162456588",
    appId: "1:515162456588:web:49e8fe6376b67c15112429",
    measurementId: "G-SJF20E0SLH"
})

export const FirebaseAuth = FirebaseApp.auth();
//const analytics = getAnalytics(FirebaseApp);
export default FirebaseApp;