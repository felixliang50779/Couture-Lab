import { useDisclosure, Collapse } from '@chakra-ui/react';

import DashboardNavBar from '../Components/dashboardnavbar';
import { FirebaseAuth } from '../Utilities/firebase';

import styles from '../PageStyles/Profile.module.css';


function CollapseForm() {
    const { isOpen, onToggle } = useDisclosure();

    const saveUserInfo = () => {
        /*const formData = watch(); // Get the current form data
        const questionnaireRef = doc(db, 'virtual-closet', 'questionnaires');
        
        let updateObj = {}
        updateObj[FirebaseAuth.currentUser.uid] = formData;

        updateDoc(questionnaireRef, updateObj);*/
    }

    return (
        <>
            <button onClick={onToggle} className={styles['profile-stylingbutton']}>Edit Styling Preferences</button>
            <Collapse in={isOpen} animateOpacity>
                <h1>lebron james</h1>
                <button className={styles['profile-updatebutton']} onClick={saveUserInfo}>Update Profile</button>
            </Collapse>
        </>
      )
}

export default function Profile() {
    const currentUser = FirebaseAuth.currentUser;
    const currentUserEmail = currentUser.email;

    return (
        <div>
            <DashboardNavBar />
            <div className={styles['profile-main-container']}>
                <div className={styles['profile-userinfo-card']}>
                    <div className={styles['profile-userinfo-card-inner']}>
                        <img className={styles['profile-userimg']} src='https://eu.ui-avatars.com/api/?name=wss&size=300' alt='ProfilePic' loading='lazy' />
                        <div className={styles['profile-userinfo-text']}>
                            <p>Real name</p>
                            <p>{currentUserEmail}</p>
                        </div>
                    </div>  
                </div>
                <div className={styles['profile-styling-card']}>
                    <div className={styles['profile-styling-card-inner']}>
                        <h1>Styling Preferences</h1>
                        <h2>Current Styling Preferences</h2>
                        <p>Gender:</p>
                        <p>Age Group:</p>
                        <p>Preferred Style:</p>
                        <p>Hair Color:</p>
                        <p>Skin Tone:</p>
                        <p>Hair Color:</p>
                        <p>Eye Color:</p>
                        <p>Experimental Level:</p>
                        <p>Budget:</p>
                        <p>Sustainability Importance:</p>
                        <p>Frequent Events:</p>
                        <CollapseForm />
                    </div>
                </div>
            </div>
        </div>
    )
}