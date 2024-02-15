// Needs to be firebase/compat/app to remove Module not found: Error: Package path . is not exported from package
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = ({
    apiKey: "AIzaSyAo_5IXL06BD9JLRl_6veOa4pmZ97rKLKY",
    authDomain: "couture-lab-backend.firebaseapp.com",
    projectId: "couture-lab-backend",
    storageBucket: "couture-lab-backend.appspot.com",
    messagingSenderId: "515162456588",
    appId: "1:515162456588:web:49e8fe6376b67c15112429",
    measurementId: "G-SJF20E0SLH"
})

const app = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(app);
const storage = getStorage(app);

export default app;
export { FirebaseAuth, storage };