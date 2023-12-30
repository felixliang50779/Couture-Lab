import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from './Contact.module.css';

export default function Contact() {
    return (
        <div className={styles["contact-container"]}>
            <Navbar />
            <div className={styles["contact-content"]}>
                <h1 className={styles["contact-header"]}>Contact Us</h1>
                <div className={styles["contact-info-container"]}>
                    <section>
                        <h1 className={styles["contact-getintouch"]}>Get in Touch</h1>
                        <h2 className={styles["contact-info"]}>1240 Arroyo Vista, Albuquerque, New Mexico, US </h2>
                        <h2 className={styles["contact-info"]}>000.000.0000</h2>
                        <h2 className={styles["contact-info"]}>
                            <a href="mailto:hello@gmail.com">lebronjames@couturelab.com</a>
                        </h2>
                    </section>
                    <form className={styles["contact-form"]}>
                        <input className={styles["contact-input"]} type="text" maxlength="100" name="name" placeholder="Your name" required></input>
                        <input className={styles["contact-input"]} type="email" maxlength="100" name="email" placeholder="Your email" required></input>
                        <textarea className={styles["contact-input"]} maxlength="1000" name="field" placeholder="Your text" required></textarea>
                        <input type="submit" value="submit" />
                    </form>
                </div>
                <a href="/SignIn" className={styles["contact-letstalk"]}>Let's talk</a  >
            </div>
            <Footer />
        </div>
    )
}