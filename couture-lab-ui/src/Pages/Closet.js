import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from './Closet.module.css';

export default function Closet() {
    return (
        <div className={styles['closet-container']}>
            <Navbar />
            <Footer />
        </div>
    )
}