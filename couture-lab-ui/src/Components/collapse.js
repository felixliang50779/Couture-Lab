import { useDisclosure, Collapse } from '@chakra-ui/react';
import { db, FirebaseAuth } from '../Utilities/firebase';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import FormSelect from '../Components/formselect';

import { toast } from 'react-toastify';
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

function CollapseForm({ userStylingPreferences, setUserStylingPreferences }) {

    const { 
        watch, 
        register, 
        formState: { errors, isValid } 
    } = useForm({ mode: "all" });

    const saveUserInfo = () => {
        const formData = watch(); // Get the current form data
        const questionnaireRef = doc(db, 'virtual-closet', 'questionnaires');
        
        let updateObj = {}
        updateObj[FirebaseAuth.currentUser.uid] = formData;

        try {
            if (!isValid) {
                toast.error("Form not complete, fill out all fields");
                return;
            }

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
                        <FormSelect 
                            name="Gender" 
                            defaultSelect={userStylingPreferences["Gender"]} 
                            options={options.gender} 
                            register={register} 
                            errors={errors} 
                            placeholder="Select gender"
                        />
                        <label>Your age group helps us tailor suggestions more appropriately</label>
                        <FormSelect 
                            name="Age group" 
                            defaultSelect={userStylingPreferences["Age group"]} 
                            options={options.ageGroup} 
                            register={register} 
                            errors={errors} 
                            placeholder="Select age group" 
                        />
                        <h1 className={styles['form-header']}>Fashion Preferences</h1>
                        <label>Which style best describes your everyday fashion?</label>
                        <FormSelect 
                            name="Preferred style" 
                            defaultSelect={userStylingPreferences["Preferred style"]} 
                            options={options.preferredStyle} 
                            register={register} 
                            errors={errors} 
                            placeholder="Preferred Style" 
                        />
                        <h1 className={styles['form-header']}>Personal Characteristics</h1>
                        <h2>These questions help the AI suggest colors that complement your look</h2>
                        <FormSelect 
                            name="Hair color" 
                            defaultSelect={userStylingPreferences["Hair color"]} 
                            options={options.hairColor} 
                            register={register} 
                            errors={errors} 
                            placeholder="Hair Color" 
                        />
                        <label>What's your skin tone?</label>
                        <FormSelect 
                            name="Skin tone" 
                            defaultSelect={userStylingPreferences["Skin tone"]} 
                            options={options.skinTone} 
                            register={register} 
                            errors={errors} 
                            placeholder="Skin Tone" 
                        />
                        <label>What's your eye color?</label>
                        <FormSelect 
                            name="Eye color" 
                            defaultSelect={userStylingPreferences["Eye color"]} 
                            options={options.eyeColor} 
                            register={register} 
                            errors={errors}
                            placeholder="Eye Color" 
                        />
                        <h1 className={styles['form-header']}>Body type and Comfort</h1>
                        <label>Identifying your body type helps us suggest the most flattering outfits</label>
                        <FormSelect 
                            name="Body type" 
                            defaultSelect={userStylingPreferences["Body type"]} 
                            options={options.bodyType} 
                            register={register} 
                            errors={errors} 
                            placeholder="Body Type" 
                        />
                        <label>How open are you to trying new fashion styles?</label>
                        <FormSelect 
                            name="Experiment level"
                            defaultSelect={userStylingPreferences["Experiment level"]}  
                            options={options.experimentLevel} 
                            register={register} 
                            errors={errors} 
                            placeholder="Experiment Level" 
                        />
                        <h1 className={styles['form-header']}>Shopping and Wardrobe Preferences</h1>
                        <label>Understanding your budget allows us to recommend clothes that fit your wallet</label>
                        <FormSelect 
                            name="Budget"
                            defaultSelect={userStylingPreferences["Budget"]}   
                            options={options.budget} 
                            register={register} 
                            errors={errors} 
                            placeholder="Budget" />
                        <label>How important is sustainability in fashion to you?</label>
                        <FormSelect 
                            name="Sustainability" 
                            defaultSelect={userStylingPreferences["Sustainability"]}   
                            options={options.sustainabilityImportance} 
                            register={register} 
                            errors={errors}     
                            placeholder="Sustainability Importance" 
                        />
                        <h1 className={styles['form-header']}>Events and Occasions</h1>
                        <label>What types of events do you dress for most often?</label>
                        <FormSelect 
                            name="Frequent events" 
                            defaultSelect={userStylingPreferences["Frequent events"]}   
                            options={options.frequentEvents} 
                            register={register} 
                            errors={errors} 
                            placeholder="Frequent Events" 
                        />
                    </div>
                </form>
                <button 
                    className={styles['profile-updatebutton']}
                    onClick={saveUserInfo}
                >
                    Update Profile
                </button>
            </Collapse>
        </>
      )
}

export default CollapseForm;