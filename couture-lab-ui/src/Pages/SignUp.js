// Utility-related modules
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FirebaseAuth} from '../Utilities/firebase.js';

import { toast } from 'react-toastify';

import styles from '../PageStyles/SignIn.module.css';


const SignUp = () => {
    const navigate = useNavigate();

    const [userSignedIn, setUserSignedIn] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* Checks if user is signed in. However, if the user goes to '/signup' after they are logged in, 
    it automatically redirects to 'verifyemail'. Will fix later */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
            if (user) {
                setUserSignedIn(true);
                navigate('/verifyemail');
            } else {
                setUserSignedIn(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Creates user in Firebase
        try {
            await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            await sendEmailVerification(FirebaseAuth.currentUser);
        } catch (error) {
            console.log(error);
            toast.error('Failed to sign up.')
        }
    };

    return (
        <div className={styles['signin-container']}>
            <div className={styles['signin-card']}>
                <div className={styles['card-header']}>
                    <a className={styles['couturelab-logo']} href='/'>couturelab</a>
                </div>
                <div className={styles['signin-content']}>
                    <div className={styles['signin-content-text']}>
                        <h1 className={styles['signin-header']}>Sign up</h1>
                        <h2 className={styles['signin-welcomeback']}>Create account</h2>
                    </div>
                    { userSignedIn ? (
                        <h1>You are already signed in</h1>
                    ) : (
                        <div className={styles['signin-input-container']}>
                            <form className={styles['signin-form']} onSubmit={handleSignUp}>
                                <h2 className={styles['form-title']}>Email</h2>
                                <input
                                    className={styles['form-input']}
                                    type="text"
                                    name="email"
                                    placeholder="E.u. lebronjames"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <h2 className={styles['form-title']}>Password</h2>
                                <input
                                    className={styles['form-input']}
                                    type="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input className={styles['signin-submit']} type="submit" />
                            </form>
                            <div className={styles['signin-register']}>
                                <h2>Already Registered?</h2>
                                <i>
                                    <a className={styles['signin-register-link']} href="/signin">
                                        Login
                                    </a>
                                </i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;