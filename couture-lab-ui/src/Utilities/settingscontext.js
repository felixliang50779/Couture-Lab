import { createContext, useState } from "react";


export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isPersonalized, setIsPersonalized] = useState('1');

    let contextData = {
        isPersonalized: isPersonalized,
        setIsPersonalized: setIsPersonalized
    }

    return (
        <SettingsContext.Provider value={contextData}>
            {children}
        </SettingsContext.Provider>
    );
};