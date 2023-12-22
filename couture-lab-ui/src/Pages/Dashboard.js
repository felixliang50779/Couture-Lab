import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { TypeAnimation } from "react-type-animation";

import { motion, AnimatePresence } from "framer-motion"; 

import DashboardNavbar from '../Components/dashboardnavbar';

import StylingRecommendImage from '../Assets/Images/styling-image.png';
import VirtualClosetImage from '../Assets/Images/virtual-closet.jpg';
import OutfitHistoryImage from '../Assets/Images/outfit-history.png';

import styles from './Dashboard.module.css';

export default function Dashboard() {
    const [assistantActive, setAssistantActive] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatLog, setChatLog] = useState([]);

    const handleQuery = async (event) => {
        event.preventDefault();

        const userInput = event.target[0].value;

        setChatInput('');

        const response = await fetch('http://127.0.0.1:8000/langserve/',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({"text": userInput})
        });

        let responseText = await response.text();

        responseText = responseText.replaceAll("\"", '');
        
        setChatLog(prevState => [...prevState, [userInput, responseText]]);
    }

    return (

        <div className={styles['dashboard-container']}>
            <DashboardNavbar />
            <AnimatePresence>
                {!assistantActive ?
                    <motion.div 
                        className={styles['component-container']}
                        initial={{y: "10%", opacity: 0, scale: 0.5}}
                        animate={{y: 0, opacity: 1, scale: 1}}
                        transition={{duration: 0.3, ease: "anticipate"}}>
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
                            <Link to="/Calendar">
                                <img 
                                    className={styles['clothes-rack-img']}
                                    src={OutfitHistoryImage}
                                    alt="OutfitHistoryImg"
                                    loading="lazy" />
                            </Link>
                            <h1>Outfit History</h1>
                        </div>
                        <div className={styles['styling-recommend']}>
                            <Link to="/Recommend">
                                <img 
                                    className={styles['styling-recommend-img']}
                                    src={StylingRecommendImage}
                                    alt="StylingRecommendImg"
                                    loading="lazy" />
                            </Link>
                            <h1>Styling Recommendations</h1>
                        </div>
                    </motion.div> :
                    <motion.div 
                        className={styles['answer-log']}
                        key="answer-box"
                        initial={{y: "10%", opacity: 0}}
                        animate={{y: 0, opacity: 1, scale: 1}}
                        transition={{duration: 0.4, ease: "anticipate"}}
                        >
                        {chatLog.map((query, index) => {
                            return (
                                <div key={index}>
                                    <p className={styles['chatbot-query']}>You: {query[0]}</p>
                                    <br />
                                    {query[1].replaceAll('\\n', '\n').replaceAll("\\", '').split('\n').map((i, key) => {

                                        return <TypeAnimation 
                                                    key={key}
                                                    sequence={[i]}
                                                    cursor={false}
                                                    speed={90}
                                                    wrapper="p"
                                                    style={{
                                                        fontSize: '1.1em',
                                                        fontWeight: 'bold',
                                                        display: 'flex'
                                                    }} />
                                    })}
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            )
                        })}
                    </motion.div>
                }
            </AnimatePresence>
            <form 
                className={styles['chatbot-container']}
                onSubmit={handleQuery}>
                    <Input
                        className={styles['chatbot-input']}
                        width="88vw"
                        value={chatInput}
                        variant="flushed"
                        borderColor="black"
                        focusBorderColor="black"
                        onBlur={() => setAssistantActive(false)}
                        onFocus={() => setAssistantActive(true)}
                        onChange={e => setChatInput(e.target.value)}
                        placeholder="Chat with Your Styling Assistant"/>
            </form>
        </div>
    )
}