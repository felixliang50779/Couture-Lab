import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles['footer-container']}>
            <div className={styles['footer-title']}>CoutureLab</div>
            <div className={styles['footer-content']}>
                <p className={styles['footer-date']}>&copy; {new Date().getFullYear()} CoutureLab</p>
                <ul className={styles.footerLinks}>
                    <li><a className={styles.footerLinks} href="/about">About</a></li>
                    <li><a className={styles.footerLinks} href="/Contact">Contact</a></li>
                </ul>
            </div>
        </footer>
    );
}