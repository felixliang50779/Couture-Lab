import { Link } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../Context/authcontext.js';

import styles from './SignIn.module.css';

export default function SignIn() {
    let { user, loginUser } = useContext(AuthContext);

    return (
        <div className={styles['signin-container']}>
            <Link to="/" className={styles['signin-logo']}>CoutureLab</Link>
            <h1 className={styles['signin-header']}>Welcome back!</h1>
            {user ? (
                <h1 className={styles['signin-header']}>You are already logged in!</h1>
            ) : (
                <form onSubmit={loginUser}>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="submit" />
                </form>
            )}
        </div>
    )
}