import React from 'react';
import styles from './About.module.css';
import NavBar from '../Components/navbar';
import Footer from '../Components/footer';
import dungMemberImage from '../Assets/Images/dungImage.png';
import oliviaMemberImage from '../Assets/Images/oliviaImage.jpg';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; 

export default function About() {
    return (
        <div className={styles['about-container']}>
            <NavBar />
            <h1>About The Team</h1>
            <div className={styles['team-container']}>
            {/* member section*/}
            
            <div className={styles['team-member']}>
                <img src={oliviaMemberImage} alt="Olivia Engler" />
                <h3>Olivia Engler</h3>
                <div className="team-info">
                    <p>Visionary for webapp concept</p>
                    <ul className={styles['team-icon']}> 
                        <li><a href="https://www.linkedin.com/in/oliviaengler/"><FaLinkedin /></a></li> 
                    </ul>
                </div>
            </div>
            {/* member section*/}
            <div className={styles['team-member']}>
                <h3>Felix Liang</h3>
                <div className="team-info">
                    <p>Worked on AI chatbot, pulling from online shopping platforms using OpenAI technology</p>
                    <ul className={styles['team-icon']}> 
                        <li><a href="https://www.linkedin.com/in/felix-liang-0b401a1ba/"><FaLinkedin /></a></li> 
                        <li><a href="https://github.com/felixliang50779"><FaGithub /></a></li> 
                    </ul>
                </div>
            </div>
            {/* member section */}
            <div className={styles['team-member']}>
                <img src={dungMemberImage} alt="Dung Nguyen" />
                <h3>Dung Nguyen</h3>
                <div className="team-info">
                    <p>Worked on About Page and assisted with frontend design</p>
                    <ul className={styles['team-icon']}> 
                        <li><a href="https://www.linkedin.com/in/dung-zoom-nguyen3000/"><FaLinkedin /></a></li> 
                        <li><a href="https://github.com/Zooomulus"><FaGithub /></a></li> 
                    </ul>
                </div>
            </div>
            {/* member section */}

            <div className={styles['team-member']}>
                <h3>Tucker Radgens</h3>
                <div className="team-info">
                    <p>Worked on backend databases</p>
                    <ul className={styles['team-icon']}>
                        <li><a href="https://www.linkedin.com/in/tucker-radgens-26413a287/"><FaLinkedin /></a></li> 
                        <li><a href="https://github.com/radgenst14"><FaGithub /></a></li> 
                    </ul>
                </div>
            </div>
            {/* member section */}
            <div className={styles['team-member']}>
                <h3>David Xiong</h3>
                <div className="team-info">
                    <p>worked on UI Design, Animations</p>
                    <ul className={styles['team-icon']}> 
                        <li><a href="https://www.linkedin.com/in/dung-zoom-nguyen3000/"><FaLinkedin /></a></li> 
                        <li><a href="https://github.com/dahabibi"><FaGithub /></a></li> 
                    </ul>
                </div>
            </div>
            {/* member section */}
            </div>

            <Footer/>
        </div>
    );
};


