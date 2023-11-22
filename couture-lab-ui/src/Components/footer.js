import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles['footer-container']}>
            <div id="footerLogo" className={styles['footer-title']}>CoutureLab</div>
            <div id="footerContent" className={styles['footer-content']}>
                <p>&copy; {new Date().getFullYear()} CoutureLab</p>
                <ul className={styles.footerLinks}>
                    <li><a className={styles.footerLinks} href="/about">About</a></li>
                    <li><a className={styles.footerLinks}href="/contact">Contact</a></li>
                    <li><a className={styles.footerLinks} href="/privacy-policy">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
}