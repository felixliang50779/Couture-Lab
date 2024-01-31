import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../Utilities/firebase.js';

import styles from './SignIn.module.css';


const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        // Log in user in Firebase
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles['signin-container']}>
            <Link to="/" className={styles['signin-logo']}>
                CoutureLab
            </Link>
            <div className={styles['signin-text-container']}>
                <h1>Login</h1>
                <h2>Welcome back 😊</h2>
                <div className={styles['signin-input-container']}>
                    <form className={styles['signin-form']} onSubmit={handleSignIn}>
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
                        <input type="submit" />
                    </form>
                    <div className={styles['signin-register']}>
                        <h2>Not Registered Yet? </h2>
                        <Link className={styles['signin-register-link']} to="/signup">
                            &nbsp;Register
                        </Link>
                        <svg
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M7 17L17 7M17 7H8M17 7V16"
                                    stroke="#0000FF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;