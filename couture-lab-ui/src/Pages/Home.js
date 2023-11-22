import { motion } from 'framer-motion';

import NavBar from '../Components/navbar';
import Button from '../Components/button';
import Footer from '../Components/footer';

import LandingImage from '../Assets/Images/landing-image.png';
import StylingImage from '../Assets/Images/styling-image.png';
import ClosetImage from '../Assets/Images/virtual-closet.jpg';
import OutfitHistoryImage from '../Assets/Images/outfit-history.png';
import styles from './Home.module.css';

const AnimatedTextSection = ({title, desc}) => (
    <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{once: true }}
        transition={{ duration: 1 }}
    >
        <div className={styles['section-text']}>
            <h1 className={styles['section-title']}>{title}</h1>
            <h3 className={styles['section-desc']}>{desc}</h3>
            <Button text="Get Started" />
        </div>
    </motion.div>
);

export default function Home() {
    return (
        <div className={styles['content-container']}>
            <NavBar />
            <div id="landingDesc" className={styles['landing-content']}>
                <AnimatedTextSection 
                    title="Discover Your Personal Style"
                    desc="AI Powered Stylist Offering Personalized
                    Recommendations To Help You Look And Feel Your Best"
                />
                <div className={styles['img-container']}>           
                    <img 
                        className={styles['landing-img']}
                        src={LandingImage}
                        alt="landingImg"
                        loading="lazy" 
                    />
                </div>
            </div>
            <div id="stylingDesc" className={styles['styling-tips']}>
                <AnimatedTextSection 
                    title="Styling Tips"
                    desc="From fashion advice to a personal shopper,
                    your very own AI stylist has you covered"
                />
                <div className={styles['img-container']}>
                    <img
                        className={styles['landing-img']}
                        src={StylingImage}
                        alt='stylingImg'
                        loading='lazy' 
                    />
                </div>
            </div>
            <div id="closetDesc" className={styles['virtual-closet']}>
                <AnimatedTextSection 
                    title="Your Entire Closet At Your Fingertips"
                    desc="Access anytime, anywhere by uploading pictures of your
                    wardrobe"
                />
                <div className={styles['img-container']}>
                    <img 
                        className={styles['landing-img']}
                        src={ClosetImage}
                        alt="landingImg"
                        loading="lazy" 
                    />
                </div>
            </div>
            <div id='outfitHistoryDesc' className={styles['outfit-history']}>
                <AnimatedTextSection 
                    title="Organize Your Outfits"
                    desc="Keep track of everything 
                    you've worn in the past, and plan ahead to keep yourself organized"
                />
                <div className={styles['img-container']}>
                    <img 
                        className={styles['landing-img']}
                        src={OutfitHistoryImage}
                        alt="landingImg"
                        loading="lazy" 
                    />
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{once: true }}
                transition={{ duration: 1 }}
            >
                <div id='lastPageDesc' className={styles['last-page']}>
                    <div className={styles['section-text']}>
                        <h1 className={styles['last-page-title']}>What are you waiting for?</h1>
                        <a className={styles['last-page-link']} href='/Dashboard'>Start Styling</a>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </div>
    )
}