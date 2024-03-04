// UI-related modules
import { toast } from 'react-toastify';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

import styles from '../PageStyles/Contact.module.css';

export default function Contact() {
    const submitContactMessage = () => {
        toast.success('Message submitted');
    }

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
                <h1 className={styles['contact-form-header']}>contact</h1>
                <div className={styles['contact-form-holder']}>
                    <h1>FULL NAME</h1>
                    <input placeholder='YOUR NAME' type='text' name='fullname'></input>
                    <h1>EMAIL</h1>
                    <input placeholder='YOUR EMAIL' type='text' name='email'></input>
                    <h1>MESSAGE</h1>
                    <textarea placeholder='YOUR MESSAGE HERE' name='message'></textarea>
                </div>
                <button onClick={submitContactMessage} className={styles['contact-form-submit']}>Submit</button>
            </div>
            <Footer />
        </div>
    )
}