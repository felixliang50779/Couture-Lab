import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from './Recommendation.module.css';

export default function Recommendation() {
    return (
        <div className={styles['recommend-container']}>
            <Navbar />  
            <Footer />
        </div>
    )
}