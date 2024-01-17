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
                    <a className={styles['signup-register-link']} href='/SignIn'>&nbsp;Create an account</a> 
                    <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#0000FF" stroke-width="2" 
                            stroke-linecap="round" stroke-linejoin="round"></path> 
                        </g>
                    </svg> 
                </div>
            </div>
        </div>
    )
}