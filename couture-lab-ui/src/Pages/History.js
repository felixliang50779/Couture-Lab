import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from './History.module.css';

export default function History() {
    return (
        <div className={styles['history-container']}>
            <Navbar />
            <Footer />
        </div>
    )
}