import NavBar from '../Components/navbar';
import Button from '../Components/button';

import LandingImage from '../Assets/Images/landing-image.png';
import StylingImage from '../Assets/Images/styling-image.png';
import ClosetImage from '../Assets/Images/closet-image.png';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles['content-container']}>
            <NavBar />
            <div className={styles['landing-content']}>
                <div className={styles['section-text']}>
                    <h1 className={styles['section-title']}>Discover Your Personal Style</h1>
                    <h3 className={styles['section-desc']}>
                        AI Powered Stylist Offering Personalized
                        Recommendations To Help You Look And Feel Your Best
                    </h3>
                    <Button text="Go To Dashboard"/>
                </div>
                <img 
                    className={styles['landing-img']}
                    src={LandingImage}
                    alt="landingImg"
                    loading="lazy" />
            </div>
            <div id="stylingDesc" className={styles['styling-tips']}>
                <div className={styles['section-text']}>
                    <h1 className={styles['section-title']}>
                        Styling Tips
                    </h1>
                    <h3 className={styles['section-desc']}>
                        Learn more about cuts, textures and prints that best suit your 
                        figure from your personalized style guide. We will make shopping
                        quicker and easier for you by curating a bespoke edit that suits
                        your style and budget.
                    </h3>
                    
                </div>
                <img
                    className={styles['landing-img']}
                    src={StylingImage}
                    alt='stylingImg'
                    loading='lazy' />
            </div>
            <div id="closetDesc" className={styles['virtual-closet']}>

            </div>
            <div className={styles['outfit-history']}>

            </div>
        </div>
    )
}