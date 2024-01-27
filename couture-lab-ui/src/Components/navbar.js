import React from 'react';
import { useContext } from 'react';

import AuthContext from '../Context/authcontext.js';

import styles from './navbar.module.css';   

export default function NavBar() {
    let { user, logoutUser } = useContext(AuthContext);

    return (
        <nav className={styles['navbar-container']}>
            <a href="/" className={styles["navbar-logo"]}>CoutureLab</a>
            {user ? (
                <button onClick={logoutUser}>Sign Out</button>
            ) : (
                <a href="/signin" className={styles["navbar-signin"]}>Sign In</a>
            )}
        </nav>
    );
}