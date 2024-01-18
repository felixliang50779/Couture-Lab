import React, { useState } from 'react'
import styles from './navbar.module.css';   

export default function NavBar() {
    const [overlapChange, setOverlap] = useState(false);
    const changeNavbarOverlap = () => {
        if (window.scrollY >= 20) {
            setOverlap(true);
        }
        else {
            setOverlap(false);
        }
    }
    
    window.addEventListener("scroll", changeNavbarOverlap);

    return (
        <nav id="navbar" className={`${styles["navbar"]} ${overlapChange ? styles["scrollNavbar"] : ''}`}>
            <a href="/" className={styles.logo}>CoutureLab</a>
            <div className={styles["navbar-right"]}>
                <a href="/SignIn" className={styles["navbar-signin"]}>Sign In</a>
            </div>
        </nav>
    );
}