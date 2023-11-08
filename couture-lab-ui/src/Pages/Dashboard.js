import NavBar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from './Dashboard.module.css';

export default function Dashboard() {
    return (
        <div className={styles['dashboard-container']}>
            <NavBar />
            <div className={styles['horizontal-boxes']}>
                <div className={styles['dashboard-box']}>
                    <h2>Virtual Closet</h2>
                    <p>
                        Box 1 Content
                    </p>
                </div>

                <div className={styles['dashboard-box']}>
                    <h2>Outfit History</h2>
                    <p>
                        Box 2 content
                    </p>
                </div>
                
                <div className={styles['dashboard-box']}>
                    <h2>Style Recommendations</h2>
                    <p>
                        Box 3 content
                    </p>
                </div>
            </div>
            <div className={styles['chatbot-container']}>
                <form>
                    <input className={styles['text-input']} type="text" placeholder="Say hello!"/>
                </form>
            </div>
            <Footer />
        </div>
    )
}