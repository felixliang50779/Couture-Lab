import styles from './navbar.module.css';

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <a href="/Home">CoutureLab</a>
            <div className={styles.NavbarInformation}>
                <a href='#stylingDesc'>Styling Tips</a>
                <a href='#closetDesc'>Virtual Closet</a>
                <a>Outfit History</a>
            </div>
            <a>Sign In</a>
        </nav>
    );
}