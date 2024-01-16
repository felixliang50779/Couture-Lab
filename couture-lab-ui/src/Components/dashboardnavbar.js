import { useContext } from 'react';

import AuthContext from '../Context/authcontext';

import styles from './dashboardnavbar.module.css';

export default function DashboardNavBar() {
    let { user, logoutUser } = useContext(AuthContext);
    
    return (
        <nav id="dashboard-navbar" className={styles['dashboard-navbar']}>
            <a href="/">CoutureLab</a>
            <p>Hello {user.username}</p>
            <button onClick={logoutUser}>Logout</button>
        </nav>
    );
}