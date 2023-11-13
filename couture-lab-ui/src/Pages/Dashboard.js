import { Link } from "react-router-dom";
import { Input } from "@nextui-org/react";
 
import Navbar from '../Components/navbar';

import StylingRecommendImage from '../Assets/Images/styling-recommend.jpg';
import VirtualClosetImage from '../Assets/Images/virtual-closet.jpg';
import ClothesRackImage from '../Assets/Images/clothes-rack.png';

import styles from './Dashboard.module.css';

export default function Dashboard() {
    return (
        <div className={styles['dashboard-container']}>
            <Navbar />
            <div className={styles['component-container']}>
                <div className={styles['virtual-closet']}>
                    <Link to="/Closet">
                        <img 
                            className={styles['virtual-closet-img']}
                            src={VirtualClosetImage}
                            alt="VirtualClosetImg"
                            loading="lazy" />
                    </Link>
                    <h1>Virtual Closet</h1>
                </div>
                <div className={styles['outfit-history']}>
                    <Link to="/History">
                        <img 
                            className={styles['clothes-rack-img']}
                            src={ClothesRackImage}
                            alt="ClothesImg"
                            loading="lazy" />
                    </Link>
                    <h1>Outfit History</h1>
                </div>
                <div className={styles['styling-recommend']}>
                    <Link to="/Recommendation">
                        <img 
                            className={styles['styling-recommend-img']}
                            src={StylingRecommendImage}
                            alt="StylingRecommendImg"
                            loading="lazy" />
                    </Link>
                    <h1>Styling Recommendations</h1>
                </div>
            </div>
            <div className={styles['chatbot-container']}>
                <Input variant="underlined" className={styles['chatbot-input']}>Test</Input>
            </div>
        </div>
    )
}