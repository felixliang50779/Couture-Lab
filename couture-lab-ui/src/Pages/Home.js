import { motion } from 'framer-motion';

import NavBar from '../Components/navbar';
import Button from '../Components/button';
import Footer from '../Components/footer';

import BannerImage from '../Assets/Images/home-banner.png';
import GreenDressImage from '../Assets/Images/green-dress.jpg';
import WardrobeImage from '../Assets/Images/wardrobe.png';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles['content-container']}>
            <NavBar />
            <img className={styles['banner-img']} src={BannerImage} alt="bannerImg" loading="lazy"/>
            <h1 className={styles['banner-header']}>CoutureLab</h1>
            <h2 className={styles['banner-text']}>Revolutionizing Fashion</h2>
            <section className={styles['getstarted-container']}>
                <h1 className={styles['getstarted-header']}>Let's Get Started, Together.</h1>
                <Button text="Get Started" />
            </section>
            <hr className={styles['divider']} />
            <section className={styles['whatweare-container']}>
                <h1 className={styles['whatweare-header']}>Our Goal</h1>
                <h1 className={styles['whatweare-text']}>Creating personalized recommendations through an AI-powered 
                stylist, all to help <i>You</i> look and feel your best.</h1>
            </section>
            <section className={styles['greendress-container']}>
                <img className={styles['green-dress']} src={GreenDressImage} alt="greendress" loading="lazy" />
                <h1 className={styles['greendress-text']}>From fashion advice to a personal shopper, your very own AI stylist 
                has you covered.</h1>
            </section>
            <section className={styles['outfit-container']}>
                <h1 className={styles['outfit-header']}>Organize Your Outfits</h1>
                <h1 className={styles['outfit-text']}>Keep track of everything you've worn in the past, and plan ahead to 
                keep yourself organized.</h1>
            </section>
            <section className={styles['wardrobe-container']}>
                <div className={styles['wardrobe-text']}>
                    <h1 className={styles['wardrobe-header']}>Your Entire Closet At Your Fingertips</h1>
                    <h2 className={styles['wardrobe-desc']}>Access anytime, anywhere by uploading pictures of your 
                    wardrobe.</h2>
                </div>
                <img className={styles['wardrobe-img']} src={WardrobeImage} alt='wardrobe' loading="lazy" />
            </section>
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