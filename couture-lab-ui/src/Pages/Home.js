import { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../Utilities/authcontext';

import NavBar from '../Components/navbar';
import Footer from '../Components/footer';

import DashboardImage from '../Assets/Images/closet.png';
import ClosetImage from '../Assets/Images/closet.png';
import ChatbotImage from '../Assets/Images/chatbot.png'

import styles from '../PageStyles/Home.module.css';


// Loads content on scroll
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
                    key={index} //unique key prop for each child
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    );
};

export default function Home() {

    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);
    
    // If user is signed in, redirects to closet
    useEffect(() => {
        if (currentUser) {
            navigate('/closet');
        }
    })

    return (
        <div className={styles['content-container']}>
            <NavBar />  
            <LoadOnView>
                <section className={styles['intro-container']}>
                    <StaggeredTextAnimation text="Revolutionizing Fashion." />
                    <h1 className={styles['intro-description']}>Experience the Future of Styling</h1>
                    <a href='/closet' className={styles['getstarted-link']}>Get Started</a>
                </section>
            </LoadOnView>
            <LoadOnView>
                <section className={styles['whatweare-container']}>
                    <h1>
                        <span style={{ fontFamily: "MarkPro" }}>couturelab</span> seeks to create personalized recommendations through artificial intelligence, 
                        all to help <u>you</u> look and feel your best.
                    </h1>
                </section>
            </LoadOnView>
            <LoadOnView>
                <section className={styles['dashboardview-container']}>
                    <div>
                        <h1 className={styles['dashboardview-header']}>Dashboard</h1>  
                        <h2 className={styles['dashboardview-description']}>
                            Everything's located one click away, all in one place. Navigate effortlessly.
                        </h2>
                    </div>
                    <img className={styles['dashboardview-img']} src={DashboardImage} alt='dashboardimg' loading='lazy' />
                </section>
            </LoadOnView>
            <LoadOnView>
                <section className={styles['closetview-container']}>
                    <img className={styles['closetview-img']} src={ClosetImage} alt='closetimg' loading='lazy' />
                    <div>
                        <h1 className={styles['closetview-header']}>Virtual Closet</h1>  
                        <h2 className={styles['closetview-description']}>
                            Space for your smart fashion, catalog your wardrobe online.
                        </h2>
                    </div>
                </section>
            </LoadOnView>
            <LoadOnView>
                <section className={styles['chatbotview-container']}>
                    <div>
                        <h1 className={styles['chatbotview-header']}>AI Fashion Stylist</h1>  
                        <h2 className={styles['chatbotview-description']}>
                            Unlock and discover your distinct style, with tailored fashion suggestions powered by AI.
                        </h2>
                    </div>
                    <img className={styles['chatbotview-img']} src={ChatbotImage} alt='chatbotimg' loading='lazy' />
                </section>
            </LoadOnView>
            <LoadOnView>
                <div id='lastPageDesc' className={styles['lastview-container']}>
                    <h1 className={styles['lastview-header']}>What are you waiting for?</h1>
                    <a className={styles['lastview-link']} href='/closet'>Start Styling</a>
                </div>
            </LoadOnView>
            <Footer />
        </div>
    )
}