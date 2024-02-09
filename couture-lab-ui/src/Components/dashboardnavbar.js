import { useContext } from 'react';
import { AuthContext } from '../Utilities/authcontext';

import styles from './dashboardnavbar.module.css';

export default function DashboardNavBar() {
    let { logoutUser } = useContext(AuthContext);

    return (
        <nav id="dashboard-navbar" className={styles['dashboard-navbar']}>
            <a href="/">CoutureLab</a>
            <button onClick={logoutUser} className={styles["navbar-signin"]}>Sign Out</button>
        </nav>
    );
}