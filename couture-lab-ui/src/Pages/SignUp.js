import { Link } from 'react-router-dom';

import styles from './SignUp.module.css';

export default function SignUp() {
    return (
        <div className={styles['signup-container']}>
            <Link to="/" className={styles['signup-logo']}>CoutureLab</Link>
            <div className={styles['signup-text-container']}>
                <h1>Register</h1>
                <h2>Create your account 😊</h2>
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
        </div>
    )
}