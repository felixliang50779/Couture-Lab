import styles from './formselect.module.css';


export default function FormSelect({ name, options, register, errors, placeholder }) {
    // Refactor so profile.js and formselect.js don't both need to get the firestore data
    /*const [alreadyChosenValue, setAlreadyChosenValue] = useState('');

    const alreadyChosenStylingPreferences = async () => {
        const closetRef = collection(db, "virtual-closet");

        const questionnaires = query(closetRef,
            where(documentId(), "==", "questionnaires"));

        const querySnapshot = await getDocs(questionnaires);
        querySnapshot.forEach((doc) => {
            if (doc.data()[FirebaseAuth.currentUser.uid]) {
                console.log(doc.data()[FirebaseAuth.currentUser.uid]);
                return;
            }
        });
    }

    useEffect(() => {
        
    });*/

    return (
        <>
            <select defaultValue='' className={styles['form-select']} {...register(name, { required: `${name} required` })}>
                <option value="" disabled hidden>{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            {errors[name] && <p className={styles['form-errormsg']}>{errors[name].message}</p>}
        </>
    );
}