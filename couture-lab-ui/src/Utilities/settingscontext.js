import { createContext } from "react";
import { doc, updateDoc, collection, query, where, documentId, getDocs } from 'firebase/firestore';
import { db, FirebaseAuth } from '../Utilities/firebase';


export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    
    const fetchSettings = async () => {
        const settingsRef = collection(db, "virtual-closet");

        const settings = query(settingsRef,
            where(documentId(), "==", "settings"));

        const settingsSnapshot = await getDocs(settings);

        let userSettings;
        settingsSnapshot.forEach(doc => {
            userSettings = doc.data()[FirebaseAuth.currentUser.uid];
        });

        return userSettings;
    }

    const setSettings = personalize => {
        const settingsRef = doc(db, 'virtual-closet', 'settings');

        console.log(personalize);

        let updateObj = {};
        updateObj[FirebaseAuth.currentUser.uid] = {"personalizeResponses": personalize};

        updateDoc(settingsRef, updateObj);
    }

    let contextData = {
        fetchSettings: fetchSettings,
        setSettings: setSettings
    }

    return (
        <SettingsContext.Provider value={contextData}>
            {children}
        </SettingsContext.Provider>
    );
};