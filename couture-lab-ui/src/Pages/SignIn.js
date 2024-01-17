import { Link } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../Context/authcontext.js';

import styles from './SignIn.module.css';

export default function SignIn() {
    let { user, loginUser } = useContext(AuthContext);

    return (
        <div className={styles['signin-container']}>
            <Link to="/" className={styles['signin-logo']}>CoutureLab</Link>
            <div className={styles['signin-text-container']}>
                <h1>Login</h1>
                <h2>Hi, Welcome back 👋</h2>
                {user ? (
                    <h1>You are already logged in!</h1>
                ) : (
                    <div className={styles['signin-input-container']}>
                        <form className={styles['signin-form']} onSubmit={loginUser}>
                            <h2>Username</h2>
                            <input type="text" name="username" placeholder="E.u. lebronjames" />
                            <h2>Password</h2>
                            <input type="password" name="password" placeholder="Enter Your Password" />
                            <input type="submit" />
                        </form>
                        <div className={styles['signin-register']}>
                            <h2>Not Registered Yet? </h2>
                            <a className={styles['signin-register-link']} href='/SignUp'>&nbsp;Create an account</a> 
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
                )}
            </div>
        </div>
    )
}