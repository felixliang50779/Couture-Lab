import styles from './dashboardnavbar.module.css';

export default function DashboardNavBar() {
    return (
        <nav id="dashboard-navbar" className={styles['dashboard-navbar']}>
            <a href="/Home">CoutureLab</a>
            <a href="/Home">Sign Out</a>
        </nav>
    );
}