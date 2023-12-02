import React, { useState } from 'react'
import styles from './navbar.module.css';   

export default function NavBar(backgroundColor) {
    console.log(backgroundColor);
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
        <nav id="navbar" className={`${styles.navbar} ${overlapChange ? styles.scrollNavbar : ''}`}>
            <a href="/Home" className={styles.logo}>CoutureLab</a>
            <div className={styles.NavbarInformation}>
                <a href='#stylingDesc'>Styling Tips</a>
                <a href='#closetDesc'>Virtual Closet</a>
                <a href='#outfitHistoryDesc'>Outfit History</a>
            </div>
            <a href="/SignIn">Sign In</a>
        </nav>
    );
}