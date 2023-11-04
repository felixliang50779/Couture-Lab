import NavBar from '../Components/navbar';

import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles['content-container']}>
            <NavBar />
        </div>
    )
}