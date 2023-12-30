import { Link } from 'react-router-dom';

import styles from './SignUp.module.css';

export default function SignUp() {

    return (
        <div className={styles['signup-container']}>
            <Link className={styles['signup-logo']} to="/Home">CoutureLab</Link>
            <h1 className={styles['signup-header']}>Let's Start</h1>
        </div>
    )
}