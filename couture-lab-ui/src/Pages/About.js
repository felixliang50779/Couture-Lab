import React from 'react';
import styles from './About.module.css';
import NavBar from '../Components/navbar';
import Footer from '../Components/footer';
import dungMemberImage from '../Assets/Images/dungImage.png';
import oliviaMemberImage from '../Assets/Images/oliviaImage.jpg';

export default function About() {
    return (
        <div className={styles['about-container']}>
            <NavBar />
            <h1>About The Team</h1>
            <p className="about-subtitle">This project is part of a 2023-2024 MSU AI Club year-long project. We tracked the project through checkpoints and presentations.</p>

            <div className={styles['team-container']}>
            {/* member section*/}
            
            <div className={styles['team-member']}>
                <img src={oliviaMemberImage} alt="Olivia Engler" />
                <h3>Olivia Rose Engler</h3>
                <div className="team-info">
                    <p>Junior at MSU</p>
                    <p>webapp idea originator and designer</p>
                    <ul className="team-icon">
                        <li><a href="https://www.linkedin.com/in/oliviaengler/" className="linkedin">
                        </a></li>
                    </ul>
                </div>
            </div>
            {/* member section*/}
            <div className={styles['team-member']}>
                <h3>Felix Liang</h3>
                <div className="team-info">
                    <p>student at MSU</p>
                    <p>Info. about Felix here</p>
                    <ul className="team-icon">
                        <li><a href="https://www.linkedin.com/in/felix-liang-0b401a1ba/" className="linkedin">
                        </a></li>
                        <li><a href="https://github.com/felixliang50779" className="github">
                        </a></li>
                    </ul>
                </div>
            </div>
            {/* member section */}
            <div className={styles['team-member']}>
                <h3>Tucker Radgens</h3>
                <div className="team-info">
                    <p>student at MSU</p>
                    <p>Info. About Tucker here</p>
                    <ul className="team-icon">
                        <li><a href="https://www.linkedin.com/in/tucker-radgens-26413a287/" className="linkedin">
                        </a></li>
                        <li><a href="https://github.com/radgenst14" className="github">
                        </a></li>
                    </ul>
                </div>
            </div>
            {/* member section */}
            <div className={styles['team-member']}>
                <img src={dungMemberImage} alt="Dung Nguyen" />
                <h3>Dung Nguyen</h3>
                <div className="team-info">
                    <p>Computer Science Major at MSU, Sophomore</p>
                    <p>Worked on: Figma, UX frontend, homepage design, About Page</p>
                    <ul className="team-icon">
                        <li><a href="https://www.linkedin.com/in/dung-zoom-nguyen3000/" className="linkedin">
                        </a></li>
                        <li><a href="https://github.com/Zooomulus" className="github">
                        </a></li>
                    </ul>
                </div>
            </div>
            {/* member section */}

            </div>

            <Footer />
        </div>
    );
};



