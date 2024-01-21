import { motion } from 'framer-motion';

import NavBar from '../Components/navbar';
import Button from '../Components/button';
import Footer from '../Components/footer';

import GreenDressImage from '../Assets/Images/green-dress.jpg';
import WardrobeImage from '../Assets/Images/wardrobe.jpg';
import LongwearImage from '../Assets/Images/longwear.jpg';
import CalendarImage from '../Assets/Images/calendar.png';

import styles from './Home.module.css';

//loads content on scroll
const LoadOnView = ({children}) => (
    <motion.div initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
    >
        {children}
    </motion.div>
);

const StaggeredTextAnimation = (text) => {
    return (
        <div className={styles['intro-header']}>
            {text.text.split("").map((char, index) => (
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    );
};

export default function Home() {
    return (
        <div className={styles['content-container']}>
            <NavBar />  
            <LoadOnView>
                <section className={styles['intro-container']}>
                    <StaggeredTextAnimation text="Revolutionizing Fashion." />
                    <img className={styles['intro-img']} src={LongwearImage} alt='longwear' loading='lazy' />
                </section>
            </LoadOnView>
            <LoadOnView>
                <section className={styles['whatweare-container']}>
                    <Button text="GET STARTED" />
                    <h1 className={styles['whatweare-text']}>COUTURELAB SEEKS TO CREATE PERSONALIZED RECOMMENDATIONS 
                    THROUGH AI, ALL TO HELP <u>YOU</u> LOOK AND FEEL YOUR BEST.</h1>
                </section>
            </LoadOnView>
            <LoadOnView>
                <section className={styles['greendress-container']}>
                    <img className={styles['green-dress']} src={GreenDressImage} alt="greendress" loading="lazy" />
                    <h1 className={styles['greendress-text']}>Introducing a location and weather-based
                    artifical intelligence style expert.</h1>
                </section>
            </LoadOnView>
            <LoadOnView>
                <section className={styles['changeway-container']}>
                    <h1 className={styles['changeway-text']}>We seek to change the Way you dress.</h1>
                </section>
            </LoadOnView>
            <LoadOnView>
                <section className={styles['wardrobe-container']}>
                    <div className={styles['wardrobe-card']}>
                        <img className={styles['wardrobe-img']} src={WardrobeImage} alt='wardrobe' loading="lazy" />
                        <h1 className={styles['wardrobe-header']}>VIRTUAL CLOSET</h1>
                        <h2 className={styles['wardrobe-desc']}>Your Entire Closet At Your Fingertips</h2>
                        <Button text="GET STARTED" />
                    </div>
                    <div className={styles['wardrobe-card']}>
                        <img className={styles['wardrobe-img']} src={CalendarImage} alt='calendar' loading="lazy" />
                        <h1 className={styles['wardrobe-header']}>PERSONALIZED CALENDAR</h1>
                        <h2 className={styles['wardrobe-desc']}>Know What Clothes You've Worn
                        </h2>
                        <Button text="GET STARTED" />
                    </div>
                </section>
            </LoadOnView>
            <LoadOnView>
                <div id='lastPageDesc' className={styles['last-page']}>
                    <div className={styles['section-text']}>
                        <h1 className={styles['last-page-title']}>What are you waiting for?</h1>
                        <a className={styles['last-page-link']} href='/Dashboard'>Start Styling</a>
                    </div>
                </div>
            </LoadOnView>
            <hr className={styles['footer-divider']} />
            <Footer />
        </div>
    )
}