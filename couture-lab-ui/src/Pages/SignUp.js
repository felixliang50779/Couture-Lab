import { Link } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../Context/authcontext.js';

import styles from './SignUp.module.css';

export default function SignUp() {
    let { user, registerUser } = useContext(AuthContext);
    return (
        <div className={styles['signup-container']}>
            <Link to="/" className={styles['signup-logo']}>CoutureLab</Link>
            <div className={styles['signup-text-container']}>
                <h1>Register</h1>
                <h2>Create your account 😊</h2>
                {user ? (
                    <h1>You are already logged in, meaning you have already signed up!</h1>
                ) : (
                    <div className={styles['signup-input-container']}>
                        <form className={styles['signup-form']} onSubmit={registerUser}>
                            <h2 className={styles['form-title']}>Username</h2>
                            <input type="text" name="username" placeholder="E.u. lebronjames" />
                            <h2 className={styles['form-title']}>Password</h2>
                            <input type="password" name="password" placeholder="Enter Your Password" />
                            <input type="password" name="verifypassword" placeholder="Verify Your Password" />
                            <input type="submit"/>
                        </form>
                        <div className={styles['signup-register']}>
                            <h2>Already Registered? </h2>
                            <a className={styles['signup-register-link']} href='/SignIn'>&nbsp;Sign In</a> 
                            <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#0000FF" strokeWidth="2" 
                                    strokeLinecap="round" strokeLinejoin="round"></path> 
                                </g>
                            </svg> 
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}