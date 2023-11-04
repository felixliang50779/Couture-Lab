import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles['content-container']}>
            <nav className={styles.navbar}>
                <a>CoutureLab</a>
                <a>Styling Tips</a>
                <a>Virtual Closet</a>
                <a>Outfit History</a>
            </nav>
        </div>
    )
}