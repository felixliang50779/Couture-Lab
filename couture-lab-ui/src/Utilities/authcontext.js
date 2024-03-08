import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { FirebaseAuth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        FirebaseAuth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    let logoutUser = () => {
        FirebaseAuth.signOut();
        setCurrentUser(null);
        navigate('/signin');
    }

    let contextData = {
        currentUser: currentUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};