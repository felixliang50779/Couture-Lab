import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './BasicInfo.module.css';


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

const FormSelect = ({ name, options, register, errors, placeholder }) => (
    <>
        <select defaultValue="" className={styles['form-select']} {...register(name, { required: `${name} required` })}>
            <option value="" disabled hidden>{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
        {errors[name] && <p className={styles['form-errormsg']}>{errors[name].message}</p>}
    </>
);

export default function BasicInfo() {
    const [formStep, setFormStep] = useState(0);

    const { 
        watch, 
        register, 
        formState: { errors, isValid } 
    } = useForm({ mode: "all" });

    const nextStep = () => {    
        setFormStep(step => step + 1);
    }
    
    const prev = () => {
        if (formStep > 0) {
            setFormStep(step => step - 1);
        }
    }

    const renderFormButton = () => {
        if (formStep > 2) return;
        return (
            <button disabled={!isValid} onClick={nextStep} type='button' className={styles['basicinfo-next-button']}>
                {formStep === 2 ? 'Submit' : 'Next'}
            </button>
        );
    }

    const handleclick = () => console.log(watch());

    return (
        <div className={styles['basicinfo-container']}>
            <h1 className={styles['basicinfo-header']}>Sign Up</h1>
            <form>
                {formStep === 0 && (
                    <div className={styles['form-basicinfo']}>
                        <h1>Basic Information</h1>
                        <label>What should we call you?</label>
                        <input placeholder='Name' required type='text' className={styles['form-input']} 
                            {...register('name', { required: 'Name required' })} 
                        />
                        <label>Username</label>
                        <input placeholder='@' required type='text' className={styles['form-input']} 
                            {...register('username', { required: 'Username required' })}
                        />
                        <FormSelect name="gender" options={options.gender} register={register} 
                            errors={errors} placeholder="Select gender" 
                        />
                        <label>Your age group helps us tailor suggestions more appropriately</label>
                        <FormSelect name="ageGroup" options={options.ageGroup} register={register} 
                            errors={errors} placeholder="Select age group" 
                        />
                    </div>
                )}
                {formStep === 1 && (
                    <div className={styles['form-basicinfo']}>
                        <h1>Fashion Preferences</h1>
                        <label>Which style best describes your everyday fashion?</label>
                        <FormSelect name="preferredStyle" options={options.preferredStyle} register={register} 
                            errors={errors} placeholder="Preferred Style" 
                        />
                        <h1>Personal Characteristics</h1>
                        <h2>These questions help the AI suggest colors that complement your look.</h2>
                        <FormSelect name="hairColor" options={options.hairColor} register={register} 
                            errors={errors} placeholder="Hair Color" 
                        />
                        <label>What's your skin tone?</label>
                        <FormSelect name="skinTone" options={options.skinTone} register={register} 
                            errors={errors} placeholder="Skin Tone" 
                        />
                        <label>What's your eye color?</label>
                        <FormSelect name="eyeColor" options={options.eyeColor} register={register} 
                            errors={errors} placeholder="Eye Color" 
                        />
                        <h1>Body type and Comfort</h1>
                        <label>Identifying your body type helps us suggest the most flattering outfits</label>
                        <FormSelect name="bodyType" options={options.bodyType} register={register} 
                            errors={errors} placeholder="Body Type" 
                        />
                        <label>How open are you to trying new fashion styles?</label>
                        <FormSelect name="experimentLevel" options={options.experimentLevel} register={register} 
                            errors={errors} placeholder="Experiment Level" 
                        />
                    </div>
                )}
                {formStep === 2 && (
                    <div className={styles['form-basicinfo']}>
                        <h1>Shopping and Wardrobe Preferences</h1>
                        <label>Understanding your budget allows us to recommend clothes that fit your wallet</label>
                        <FormSelect name="budget" options={options.budget} register={register} 
                            errors={errors} placeholder="Budget" />
                        <label>How important is sustainability in fashion to you?</label>
                        <FormSelect name="sustainability" options={options.sustainabilityImportance} register={register} 
                            errors={errors} placeholder="Sustainability Importance" 
                        />
                        <h1>Events and Occasions</h1>
                        <label>What types of events do you dress for most often?</label>
                        <FormSelect name="frequentEvents" options={options.frequentEvents} register={register} 
                            errors={errors} placeholder="Frequent Events" 
                        />
                    </div>
                )}
                {formStep === 3 && (
                    <div className={styles['form-basicinfo']}>
                        <h1>Shopping and Wardrobe Preferences</h1>
                        <h1>Thanks for finishing the questionnaire!</h1>
                    </div>
                )}
            </form>
            <button className={styles['basicinfo-next-button']} type='button' onClick={prev} 
            disabled={formStep === 0}>
                Prev
            </button>
            {renderFormButton()}
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
            <button onClick={handleclick}>Click</button>
        </div>
    );
}