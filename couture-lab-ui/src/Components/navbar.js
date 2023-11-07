import React, { useState } from 'react'
import styles from './navbar.module.css';

export default function NavBar() {
    const [colorChange, setColor] = useState(false)
    const changeNavbarColor = () => {
        if (window.scrollY >= 20) {
            setColor(true)
        }
        else {
            setColor(false)
        }
    }
    
    window.addEventListener("scroll", changeNavbarColor);

    return (
        <nav id="navbar" className={`${styles.navbar} ${colorChange ? styles.scrollNavbar : ''}`}>
            <a href="/Home">CoutureLab</a>
            <div className={styles.NavbarInformation}>
                <a href='#stylingDesc'>Styling Tips</a>
                <a href='#closetDesc'>Virtual Closet</a>
                <a href='#outfitHistoryDesc'>Outfit History</a>
            </div>
            <a href="/">Sign In</a>
        </nav>
    );
}