import NavBar from '../Components/navbar';

import LandingImage from '../Assets/Images/landing-image.png';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles['content-container']}>
            <NavBar />
            <div className={styles['landing-content']}>
                <div className={styles['landing-text']}>
                    <h1>Discover Your Personal Style</h1>
                    <p>
                        AI Powered Stylist Offering Personalized
                        Recommendations To Help You Look And Feel
                        Your Best
                    </p>
                </div>
                <img src={LandingImage} alt='landingImg' loading="lazy" />
            </div>
            <div className={styles['styling-tips']}>

            </div>
            <div className={styles['virtual-closet']}>

            </div>
            <div className={styles['outfit-history']}>

            </div>
        </div>
    )
}