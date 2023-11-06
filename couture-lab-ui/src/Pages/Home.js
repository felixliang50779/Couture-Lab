import NavBar from '../Components/navbar';
import Button from '../Components/button';
import Footer from '../Components/footer';

import LandingImage from '../Assets/Images/landing-image.png';
import StylingImage from '../Assets/Images/styling-image.png';
import ClosetImage from '../Assets/Images/closet-image.png';
import OutfitHistoryImage from '../Assets/Images/outfit-history.png';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles['content-container']}>
            <NavBar />
            <div id="landingDesc" className={styles['landing-content']}>
                <div className={styles['section-text']}>
                    <h1 className={styles['section-title']}>Discover Your Personal Style</h1>
                    <h3 className={styles['section-desc']}>
                        AI Powered Stylist Offering Personalized
                        Recommendations To Help You Look And Feel Your Best
                    </h3>
                    <Button text="Get Started"/>
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
                        From fashion advice to a personal shopper,
                        your very own AI stylist has you covered
                    </h3>
                    
                </div>
                <img
                    className={styles['landing-img']}
                    src={StylingImage}
                    alt='stylingImg'
                    loading='lazy' />
            </div>
            <div id="closetDesc" className={styles['virtual-closet']}>
                <div className={styles['section-text']}>
                    <h1 className={styles['section-title']}>Your Entire Closet At Your Fingertips</h1>
                    <h3 className={styles['section-desc']}>
                        Access anytime, anywhere by uploading pictures of your
                        wardrobe
                    </h3>
                </div>
                <img 
                    className={styles['landing-img']}
                    src={ClosetImage}
                    alt="landingImg"
                    loading="lazy" />
            </div>
            <div id='outfitHistoryDesc' className={styles['outfit-history']}>
                <div className={styles['section-text']}>
                    <h1 className={styles['section-title']}>Organize Your Outfits</h1>
                    <h3 className={styles['section-desc']}>
                        Keep track of everything you've worn in the past, and plan
                        ahead to keep yourself organized
                    </h3>
                </div>
                <img 
                    className={styles['landing-img']}
                    src={OutfitHistoryImage}
                    alt="landingImg"
                    loading="lazy" />
            </div>
            <Footer />
        </div>
    )
}