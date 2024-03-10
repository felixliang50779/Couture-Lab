// UI-related modules
import { useState, useEffect, useRef } from "react";
import { Input } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Sidebar } from "react-pro-sidebar";
import styles from './stylingAssistant.module.css';
import 'react-dots-loader/index.css';

// Utility modules
import { displayUserStylingPreferences } from "../Pages/Profile";
import parse from "html-react-parser";
import ScrollToBottom from "react-scroll-to-bottom";
import Loader from "react-dots-loader";
import Linkify from "linkify-react";

export default function StylingAssistant() {
    const [collapsed, setCollapsed] = useState(true);
    const [chatInput, setChatInput] = useState("");
    const [queryLog, setQueryLog] = useState([]);
    const [responseLog, setResponseLog] = useState([]);

    const questionnaireRef = useRef({});

    useEffect(() => {
        async function fetchData() {
            questionnaireRef.current = await displayUserStylingPreferences();
        }
        fetchData();
    });
    
    const toggleCollapse = () => {
        setCollapsed(prevState => {
            return !prevState;
        });
    }

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
            body: JSON.stringify({"text": userInput, "questionnaire": questionnaireRef.current})
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
            // Here we start reading the stream, until it's done.
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            let decodedChunk = decoder.decode(value, { stream: true });

            const logCopy = responseLog.slice();
            stylistResponse += decodedChunk;

            stylistResponse = stylistResponse.replaceAll(imgLabel, "");
            stylistResponse = stylistResponse.replaceAll('**', '');

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
        <div className={styles['sidebar-container']}>
            <Sidebar
                collapsedWidth="0vw"
                collapsed={collapsed}
                width="100vw"
                backgroundColor="white"
                style=
                {{
                    opacity: collapsed ? 0 : 1,
                    position: "fixed",
                    fontFamily: "MarkPro",
                    height: "100%",
                    zIndex: 2
                }}>
                    <ScrollToBottom 
                        className={styles['answer-log']}>
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
                    <form
                        className={styles['chatbot-container']}
                        onSubmit={handleQuery}>
                            <Input
                                width="97%"
                                minHeight="8vh"
                                value={chatInput}
                                variant="filled"
                                borderColor="gray"
                                focusBorderColor="black"
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
            </Sidebar>
            <button
                className={`${styles["sidebar-button"]} ${collapsed && styles["sidebar-hidden"]}`}
                onClick={toggleCollapse}>
                    { collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon /> }
            </button>
        </div>
    )
}