import styles from './formselect.module.css';


export default function FormSelect({ name, options, register, defaultSelect, errors, placeholder }) {
    // Refactor so profile.js and formselect.js don't both need to get the firestore data

    return (
        <div>
            <select 
                defaultValue={defaultSelect} 
                className={styles['form-select']} {...register(name, { required: `${name} required` })}
            >
                <option value="" disabled hidden>{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            {errors[name] && <p className={styles['form-errormsg']}>{errors[name].message}</p>}
        </div>
    );
}