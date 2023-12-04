import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from './Contact.module.css';

export default function Contact() {
    return (
        <div className={styles["contact-container"]}>
            <Navbar />
            <div className={styles["contact-content"]}>
                <h1 className={styles["contact-header"]}>Get in Touch</h1>
                <div className={styles["contact-footer"]}>
                    <span className={styles["contact-number"]}>000.000.0000</span>
                    <span className={styles["contact-email"]}>
                        <a href="mailto:hello@gmail.com">lebronjames@couturelab.com</a>
                    </span>
                </div>
                <h1>Let's talk</h1>
            </div>
            <Footer />
        </div>
    )
}