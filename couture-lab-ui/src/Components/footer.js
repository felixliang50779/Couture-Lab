import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} CoutureLab</p>
            <ul className={styles.footerLinks}>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
        </footer>
    );
}