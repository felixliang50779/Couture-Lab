import { useContext } from 'react';
import { AuthContext } from '../Utilities/authcontext';

import styles from './navbar.module.css';   

export default function NavBar() {
    let { currentUser, logoutUser } = useContext(AuthContext);

    return (
        <nav className={styles['navbar-container']}>
            <a href="/" className={styles["navbar-logo"]}>CoutureLab</a>
        {currentUser ? (
            <button onClick={logoutUser} className={styles["navbar-signin"]}>Sign Out</button>
        ) : (
            <a href="/signin" className={styles["navbar-signin"]}>Sign In</a>
        )}
        </nav>
    );
}