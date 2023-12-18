import styles from './About.module.css';
import NavBar from '../Components/navbar';
import Footer from '../Components/footer';

export default function About() {
    return (
        <div className={styles['about-container']}>
            <NavBar />
            <h1>
                MSU A.I Club, CoutureLab 
                <br />
                About The Team
                <br />
                We are the Best :D
            </h1>
            <Footer />
        </div>
    );
}



