import styles from './navbar.module.css';

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <a>CoutureLab</a>
            <a>Styling Tips</a>
            <a>Virtual Closet</a>
            <a>Outfit History</a>
        </nav>
    );
}