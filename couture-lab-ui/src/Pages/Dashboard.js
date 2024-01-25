import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside"; 
import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { AnimationWrapper } from "animation-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import parse from "html-react-parser";

import ScrollToBottom from "react-scroll-to-bottom";
import Loader from "react-dots-loader";
import Linkify from "linkify-react";

import DashboardNavbar from '../Components/dashboardnavbar';

import 'react-dots-loader/index.css'

import StylingRecommendImage from '../Assets/Images/styling-image.png';
import VirtualClosetImage from '../Assets/Images/virtual-closet.jpg';
import OutfitHistoryImage from '../Assets/Images/outfit-history.png';

import styles from './Dashboard.module.css';

export default function Dashboard() {
    const [assistantActive, setAssistantActive] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [queryLog, setQueryLog] = useState([]);
    const [responseLog, setResponseLog] = useState([]);

    const ref = useDetectClickOutside({ onTriggered: () => setAssistantActive(false) });

    const handleQuery = async (event) => {
        event.preventDefault();

        // Catching empty inputs
        if (!event.target[0].value) {
            return;
        }

        const userInput = event.target[0].value;

        setQueryLog(prevState => [...prevState, userInput]);

        setChatInput('');

        const response = await fetch('http://127.0.0.1:8000/langserve/',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({"text": userInput})
        });

        // Here we start prepping for the streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const loopRunner = true;
        const imgLabel = /!\[.*?\]/g;
        const imgLink = /(\(https?:\/\/encrypted-tbn.*=CAE\))/g;

        let stylistResponse = "";
        
        responseLog.push("");

        while (loopRunner) {
            // Here we start reading the stream, until its done.
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            let decodedChunk = decoder.decode(value, { stream: true });

            const logCopy = responseLog.slice();
            stylistResponse += decodedChunk;

            stylistResponse = stylistResponse.replaceAll(imgLabel, "");

            const imgUrls = stylistResponse.match(imgLink);

            if (imgUrls) {
                for (const url of imgUrls) {
                    const formattedUrl = url.slice(1, -1);
                    stylistResponse = stylistResponse.replace(`${url}`, `<img src="${formattedUrl}" alt="itemImg"/>`);
                }
            }
            
            logCopy[logCopy.length - 1] = stylistResponse;
            setResponseLog(logCopy);
        }
    }

    return (

        <div className={styles['dashboard-container']}>
            <DashboardNavbar />
            <div className={`${styles['log-wrapper']} ${assistantActive && styles.spacer}`} ref={ref}>
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
                        <AnimationWrapper
                            show={assistantActive}
                            options={{ duration: 100 }}
                            from={{ opacity: 0, transform: "translateY(100px)" }}
                            to={{ opacity: 1, transform: "translateY(0)" }}>
                                <ScrollToBottom 
                                    className={styles['answer-log']}
                                    tabIndex="0"
                                    ref={ref}>
                                    {queryLog.length !== 0 ? queryLog.map((query, index) => {
                                        return (
                                            <div key={index}>
                                                <p className={styles['chatbot-query']}>
                                                    You: {query}
                                                </p>
                                                <br />
                                                {typeof(responseLog[index]) === "string" ?
                                                    <Linkify 
                                                        options={{
                                                            target: "_blank",
                                                            className: styles.link
                                                        }}>
                                                        <p className={styles.response}>
                                                            {parse(responseLog[index])}
                                                        </p>
                                                    </Linkify> : 
                                                    <Loader 
                                                        size={8}
                                                        color="black"
                                                        style={{ marginLeft: "0.1em" }} />}
                                                <br />
                                                <br />
                                            </div>
                                        )
                                    }) : 
                                    <p className={styles['starter-text']}>
                                        Ask me anything to get started!
                                    </p>}
                                </ScrollToBottom>
                        </AnimationWrapper>
                    }
                </AnimatePresence>
                <form
                    className={styles['chatbot-container']}
                    onSubmit={handleQuery}>
                        <Input
                            width="85vw"
                            minHeight="8vh"
                            value={chatInput}
                            bgColor="#F5F4EB"
                            _hover="black"
                            variant="filled"
                            borderColor="gray"
                            focusBorderColor="black"
                            onFocus={() => setAssistantActive(true)}
                            onChange={e => setChatInput(e.target.value)}
                            placeholder="Chat with Your Styling Assistant"/>
                        <button className={styles['query-button']}>
                            <span data-state="closed">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="text-white dark:text-black">
                                        <path
                                            d="M7 11L12 6L17 11M12 18V7"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                </svg>
                            </span>
                        </button>
                </form>
            </div>
        </div>
    )
}