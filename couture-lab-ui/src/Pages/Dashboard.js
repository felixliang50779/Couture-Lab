import NavBar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from './Dashboard.module.css';

export default function Dashboard() {
    return (
        <div className={styles['content-container']}>
            <NavBar />
            <Footer />
        </div>
    )
}