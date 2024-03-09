import DashboardNavbar from '../Components/dashboardnavbar';
import Footer from '../Components/footer';

import styles from '../PageStyles/Recommend.module.css';

export default function Recommend() {
    return (
        <div className={styles["recommend-container"]}>
            <DashboardNavbar/> 
            <h1 className={styles['construction-msg']}>Under Construction</h1>
            <Footer />
        </div>
    )
}