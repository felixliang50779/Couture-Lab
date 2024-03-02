import styles from './navbar.module.css';   

export default function NavBar() {
    return (
        <nav className={styles['navbar-container']}>
            <a href="/" className={styles["navbar-logo"]}>CoutureLab</a>
            <a href="/dashboard" className={styles["navbar-signin"]}>Get Started</a>
        </nav>
    );
}