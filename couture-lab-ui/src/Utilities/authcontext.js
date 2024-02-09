import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import FirebaseApp from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        FirebaseApp.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    if (pending) {
        return <>Loading...</>
    }

    let logoutUser = () => {
        FirebaseApp.auth().signOut();
        setCurrentUser(null);
        navigate('/signin');
    }

    let contextData = {
        currentUser:currentUser,
        logoutUser:logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};