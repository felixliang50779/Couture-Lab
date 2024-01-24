import React from 'react'
import styles from './navbar.module.css';   

export default function NavBar() {
    return (
        <nav className={styles['navbar-container']}>
            <a href="/" className={styles["navbar-logo"]}>CoutureLab</a>
            <a href="/SignIn" className={styles["navbar-signin"]}>Sign In</a>
        </nav>
    );
}