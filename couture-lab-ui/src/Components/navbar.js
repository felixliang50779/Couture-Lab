import React, { useState } from 'react'
import styles from './navbar.module.css';   

const DropdownMenu = () => {
    return (
        <div className={styles["dropdown-menu"]}>
            <ul className={styles["dropdown-list"]}>
                <li><a href="/SignIn">Sign In</a></li>
                <li><a href='#stylingDesc'>Styling Tips</a></li>
                <li><a href='#closetDesc'>Virtual Closet</a></li>
                <li><a href='#outfitHistoryDesc'>Outfit History</a></li>
            </ul>
        </div>
    );
};

export default function NavBar() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

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
                <div
                    className={styles["navbar-menu"]}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src="https://www.svgrepo.com/show/522555/hamburger-menu.svg" alt="HamburgerImg"
                    loading="lazy" className={styles["navbar-button"]}/>
                    {isDropdownVisible && <DropdownMenu />}
                </div>
            </div>
        </nav>
    );
}