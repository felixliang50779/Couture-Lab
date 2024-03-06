import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles['footer-container']}>
            <div className={styles['footer-title']}>couturelab</div>
            <div className={styles['footer-content']}>
                <p className={styles['footer-date']}>&copy; {new Date().getFullYear()} couturelab</p>
                <ul className={styles['footer-links']}>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
        </footer>
    );
}