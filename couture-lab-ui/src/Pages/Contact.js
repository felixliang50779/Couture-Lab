import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from './Contact.module.css';

export default function Contact() {
    return (
        <div className={styles["contact-container"]}>
            <Navbar />
            <div className={styles["contact-intro-container"]}>
                <h1 className={styles["contact-header"]}>let's talk</h1>    
                <section className={styles["contact-info-container"]}>
                    <h2>1240 Arroyo Vista, Albuquerque, New Mexico, US</h2>
                    <br />
                    <h2 className={styles["contact-info"]}>000.000.0000</h2>
                    <h2 className={styles["contact-info"]}>
                        <a href="mailto:hello@gmail.com">lebronjames@couturelab.com</a>
                    </h2>
                </section>
            </div>
            <div className={styles['contact-form-container']}>
                <h1>contact</h1>
                <form className={styles["contact-form"]}>
                    <input className={styles["contact-input"]} type="text" name="name" placeholder="Your name" 
                        required></input>
                    <input className={styles["contact-input"]} type="email" name="email" placeholder="Your email"
                        required></input>
                    <textarea className={styles["contact-input"]} name="field" placeholder="Your text"
                        required></textarea>
                    <input type="submit" value="submit" />
                </form>
                <a href="/Dashboard" className={styles["contact-letstalk"]}>Let's talk</a>
            </div>
            <Footer />
        </div>
    )
}