// Utility-related modules
import { useEffect, useState, useContext } from 'react';
import { collection, query, where, documentId, getDocs } from 'firebase/firestore';
import { db, FirebaseAuth } from '../Utilities/firebase';
import { SettingsContext } from '../Utilities/settingscontext';
import { useNavigate } from 'react-router-dom';

// UI-related modules
import { useDisclosure, Spinner, RadioGroup, Radio, Stack } from '@chakra-ui/react';
import DeleteAccountModal from '../Components/deleteaccount';
import CollapseForm from '../Components/collapse';

import DashboardNavBar from '../Components/dashboardnavbar';

// Styling
import styles from '../PageStyles/Profile.module.css';

// Displays user styling preferences on profile
export const displayUserStylingPreferences = async () => {
    const closetRef = collection(db, "virtual-closet");

    const questionnaires = query(closetRef,
        where(documentId(), "==", "questionnaires"));

    let questionnaireData = {};

    const querySnapshot = await getDocs(questionnaires);
    querySnapshot.forEach((doc) => {
        if (doc.data()[FirebaseAuth.currentUser.uid]) {
            questionnaireData = doc.data()[FirebaseAuth.currentUser.uid];
        }
    });

    return questionnaireData;
}

export default function Profile() {
    const navigate = useNavigate();

    const [loadingStylingPreferences, setLoadingStylingPreferences] = useState(true);
    // Stores user styling preferences data for displaying
    const [userStylingPreferences, setUserStylingPreferences] = useState({});
    // Manages opening and closing of delete account dialog
    const { isOpen: deleteAccountModalOpen, onOpen: onDeleteAccountModalOpen, onClose: onDeleteAccountModalClose } = useDisclosure();

    // User information
    const currentUser = FirebaseAuth.currentUser;
    const currentUsername = currentUser.displayName;
    const currentUserEmail = currentUser.email;

    // State vars for styling assistant settings
    const { isPersonalized, setIsPersonalized } = useContext(SettingsContext);

    useEffect(() => {
        async function fetchData() {
            const userData = await displayUserStylingPreferences();
            // Checks if user did not answer questionaire, redirects to questionaire
            if (Object.keys(userData).length === 0) {
                navigate('/basicinfo');
                return;
            }
            setUserStylingPreferences(userData);
            setLoadingStylingPreferences(false);
        }
        fetchData();
    }, [navigate]);

    return (
        <div className={styles['profile-container']}>
            <DashboardNavBar />
            <div className={styles['profile-main-container']}>
                <div className={styles['profile-secondary-container']}>
                    <div className={styles['profile-userinfo-card']}>
                        <div className={styles['profile-userinfo-card-inner']}>
                            <img className={styles['profile-userimg']} src='https://eu.ui-avatars.com/api/?name=wss&size=300' alt='ProfilePic' loading='lazy' />
                            <div className={styles['profile-userinfo-text']}>
                                <p>@{currentUsername}</p>
                                <p>{currentUserEmail}</p>
                            </div>
                        </div>  
                        <button className={styles['profile-deleteaccount']} onClick={onDeleteAccountModalOpen}>
                            Delete Account
                        </button>
                        <DeleteAccountModal
                            isOpen={deleteAccountModalOpen}
                            onClose={onDeleteAccountModalClose}
                        />
                    </div>
                    <div className={styles['profile-userinfo-card']}>
                        <div className={styles['profile-userinfo-card-inner']}>
                            <div className={styles['assistant-settings-container']}>
                                <h1 className={styles['assistant-settings-card-header']}>
                                    Personalized Styling Recommendations
                                </h1>
                                <h2 className={styles['assistant-settings-card-subheader']}>
                                    Customize Your Styling Assistant
                                </h2>
                                <RadioGroup onChange={setIsPersonalized} value={isPersonalized}>
                                    <Stack spacing={4} direction="column">
                                        <Radio
                                            colorScheme="blackAlpha"
                                            value='0'>
                                                Use the vanilla styling assistant 
                                        </Radio>
                                        <Radio
                                            colorScheme="blackAlpha"
                                            value='1'>
                                                Inform the styling assistant of my preferences
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className={styles['profile-styling-card']}>
                    { loadingStylingPreferences ? (
                        <div className={styles['profile-styling-card-inner']}>
                            <Spinner size='lg' /> 
                        </div>
                    ) : (
                        <div className={styles['profile-styling-card-inner']}>
                            <h1 className={styles['profile-styling-card-header']}>Styling Preferences</h1>
                            <h2 className={styles['profile-styling-card-current']}>Current Styling Preferences</h2>
                            <section className={styles['profile-styling-card-current-preferences']}>
                                <p>Gender: {userStylingPreferences["Gender"]}</p> 
                                <p>Age Group: {userStylingPreferences["Age group"]}</p>
                                <p>Preferred Style: {userStylingPreferences["Preferred style"]}</p>
                                <p>Hair Color: {userStylingPreferences["Hair color"]}</p>
                                <p>Skin Tone: {userStylingPreferences["Skin tone"]}</p>
                                <p>Eye Color: {userStylingPreferences["Eye color"]}</p>
                                <p>Body Type: {userStylingPreferences["Body type"]}</p>
                                <p>Experimental Level: {userStylingPreferences["Experiment level"]}</p>
                                <p>Budget: {userStylingPreferences["Budget"]}</p>
                                <p>Sustainability Importance: {userStylingPreferences["Sustainability"]}</p>
                                <p>Frequent Events: {userStylingPreferences["Frequent events"]}</p>
                            </section>
                            <CollapseForm
                                userStylingPreferences={userStylingPreferences}
                                setUserStylingPreferences={setUserStylingPreferences} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}