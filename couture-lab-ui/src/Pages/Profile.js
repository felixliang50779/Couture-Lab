// Utility-related modules
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, updateDoc, collection, query, where, documentId, getDocs } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import FormSelect from '../Components/formselect';
import { db, FirebaseAuth } from '../Utilities/firebase';
import DeleteAccountModal from '../Components/deleteaccount';

// UI-related modules
import { useDisclosure, Collapse } from '@chakra-ui/react';
import { toast } from 'react-toastify';

import DashboardNavBar from '../Components/dashboardnavbar';

// Styling
import styles from '../PageStyles/Profile.module.css';

// Temporary for collapse and options, will have to refactor to reduce duplicate code
const options = {
    gender: ['Male', 'Female'],
    ageGroup: ['Under 18', '18 to 25', '26 to 35', '36 to 45', '46 to 55', 'Over 55'],
    preferredStyle: ['Casual', 'Formal', 'Business', 'Sporty', 'Bohemian', 'Vintage', 'Preppy', 'Other'],
    hairColor: ['Black', 'Brown', 'Blonde', 'Red', 'Grey', 'White', 'Other'],
    skinTone: ['Very Fair', 'Fair', 'Medium', 'Olive', 'Brown', 'Dark Brown', 'Other'],
    eyeColor: ['Brown', 'Blue', 'Green', 'Hazel', 'Grey', 'Other'],
    bodyType: ['Hourglass', 'Triangle', 'Inverted Triangle', 'Rectangle', 'Round', 'Other'],
    experimentLevel: ['Not Comfortable', 'Somewhat Comfortable', 'Very Comfortable'],
    budget: ['Low', 'Medium', 'High'],
    sustainabilityImportance: ['Not Important', 'Somewhat Important', 'Very Important'],
    frequentEvents: ['Work', 'Casual Outings', 'Formal Events', 'Fitness', 'Travel', 'Other'],
};

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

function CollapseForm({ setUserStylingPreferences }) {

    const { 
        watch, 
        register, 
        formState: { errors } 
    } = useForm({ mode: "all" });

    const saveUserInfo = () => {
        const formData = watch(); // Get the current form data
        const questionnaireRef = doc(db, 'virtual-closet', 'questionnaires');
        
        let updateObj = {}
        updateObj[FirebaseAuth.currentUser.uid] = formData;

        try {
            // Update Firebase display name
            updateProfile(FirebaseAuth.currentUser, {
                displayName: formData.name
            });

            updateDoc(questionnaireRef, updateObj);
            toast.success("Updated styling preferences");

            // Update the display styling preferences with new preferences data
            setUserStylingPreferences(formData); 
        } catch (error) {
            toast.error("Failed to update styling preferences");
        }
    }

    const { isOpen, onToggle } = useDisclosure();

    return (
        <>
            <button onClick={onToggle} className={styles['profile-stylingbutton']}>Edit Styling Preferences</button>
            <Collapse in={isOpen} animateOpacity>
                <form>
                    <div className={styles['form-basicinfo']}>
                        <h1 className={styles['form-header']}>Basic Information</h1>
                        <FormSelect name="Gender" options={options.gender} register={register} 
                            errors={errors} placeholder="Select gender"
                        />
                        <label>Your age group helps us tailor suggestions more appropriately</label>
                        <FormSelect name="Age group" options={options.ageGroup} register={register} 
                            errors={errors} placeholder="Select age group" 
                        />
                        <h1 className={styles['form-header']}>Fashion Preferences</h1>
                        <label>Which style best describes your everyday fashion?</label>
                        <FormSelect name="Preferred style" options={options.preferredStyle} register={register} 
                            errors={errors} placeholder="Preferred Style" 
                        />
                        <h1 className={styles['form-header']}>Personal Characteristics</h1>
                        <h2>These questions help the AI suggest colors that complement your look</h2>
                        <FormSelect name="Hair color" options={options.hairColor} register={register} 
                            errors={errors} placeholder="Hair Color" 
                        />
                        <label>What's your skin tone?</label>
                        <FormSelect name="Skin tone" options={options.skinTone} register={register} 
                            errors={errors} placeholder="Skin Tone" 
                        />
                        <label>What's your eye color?</label>
                        <FormSelect name="Eye color" options={options.eyeColor} register={register} 
                            errors={errors} placeholder="Eye Color" 
                        />
                        <h1 className={styles['form-header']}>Body type and Comfort</h1>
                        <label>Identifying your body type helps us suggest the most flattering outfits</label>
                        <FormSelect name="Body type" options={options.bodyType} register={register} 
                            errors={errors} placeholder="Body Type" 
                        />
                        <label>How open are you to trying new fashion styles?</label>
                        <FormSelect name="Experiment level" options={options.experimentLevel} register={register} 
                            errors={errors} placeholder="Experiment Level" 
                        />
                        <h1 className={styles['form-header']}>Shopping and Wardrobe Preferences</h1>
                        <label>Understanding your budget allows us to recommend clothes that fit your wallet</label>
                        <FormSelect name="Budget" options={options.budget} register={register} 
                            errors={errors} placeholder="Budget" />
                        <label>How important is sustainability in fashion to you?</label>
                        <FormSelect name="Sustainability" options={options.sustainabilityImportance} register={register} 
                            errors={errors} placeholder="Sustainability Importance" 
                        />
                        <h1 className={styles['form-header']}>Events and Occasions</h1>
                        <label>What types of events do you dress for most often?</label>
                        <FormSelect name="Frequent events" options={options.frequentEvents} register={register} 
                            errors={errors} placeholder="Frequent Events" 
                        />
                    </div>
                </form>
                <button className={styles['profile-updatebutton']} onClick={saveUserInfo}>Update Profile</button>
            </Collapse>
        </>
      )
}

export default function Profile() {
    // Stores user styling preferences data for displaying
    const [userStylingPreferences, setUserStylingPreferences] = useState({});
    // Manages opening and closing of delete account dialog
    const { isOpen: deleteAccountModalOpen, onOpen: onDeleteAccountModalOpen, onClose: onDeleteAccountModalClose } = useDisclosure();

    // User information
    const currentUser = FirebaseAuth.currentUser;
    const currentUsername = currentUser.displayName;
    const currentUserEmail = currentUser.email;

    useEffect(() => {
        async function fetchData() {
            const userData = await displayUserStylingPreferences();
            setUserStylingPreferences(userData);
        }
        fetchData();
    }, []);

    return (
        <div className={styles['profile-container']}>
            <DashboardNavBar />
            <div className={styles['profile-main-container']}>
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
                <div className={styles['profile-styling-card']}>
                    {/* Have to change selects so it displays current user preference. Maybe make it only update 
                    the changed select option if it's possible */}
                    <div className={styles['profile-styling-card-inner']}>
                        <h1>Styling Preferences</h1>
                        <h2>Current Styling Preferences</h2>
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
                        <CollapseForm setUserStylingPreferences={setUserStylingPreferences} />
                    </div>
                </div>
            </div>
        </div>
    )
}