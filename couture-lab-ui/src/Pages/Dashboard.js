import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";
 
import DashboardNavbar from '../Components/dashboardnavbar';

import StylingRecommendImage from '../Assets/Images/styling-image.png';
import VirtualClosetImage from '../Assets/Images/virtual-closet.jpg';
import OutfitHistoryImage from '../Assets/Images/outfit-history.png';

import styles from './Dashboard.module.css';

export default function Dashboard() {
    return (
        <div className={styles['dashboard-container']}>
            <DashboardNavbar />
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
                            src={OutfitHistoryImage}
                            alt="OutfitHistoryImg"
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
                <Input
                    width="88vw"
                    variant="flushed"
                    borderColor="black"
                    focusBorderColor="black"
                    placeholder="Chat with Your Styling Assistant"/>
            </div>
        </div>
    )
}