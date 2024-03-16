// Utility-related modules
import { useState, useEffect, useRef } from 'react';
import
{
    collection, query, documentId, where, getDocs
} from 'firebase/firestore';
import { db, FirebaseAuth } from '../Utilities/firebase';

// UI-related modules
import { useDisclosure, Spinner } from '@chakra-ui/react';
import { PiCursorClickFill, PiPantsDuotone, PiSneaker } from "react-icons/pi";
import { IoMdAdd, IoIosArrowDown } from "react-icons/io";
import { IoShirtOutline } from "react-icons/io5";
import { GiCrystalEarrings, GiClothes } from "react-icons/gi";
import { toast } from 'react-toastify';
import DashboardNavbar from '../Components/dashboardnavbar';
import StylingAssistant from '../Components/stylingAssistant';
import UploadModal from '../Components/uploadModal';
import ItemModal from '../Components/itemModal';
import DeleteModal from '../Components/deleteModal';
import OutfitModal from '../Components/outfitModal';
import Sheet from 'react-modal-sheet';

import styles from '../PageStyles/Closet.module.css';


const Closet = () => {
    // Modal controllers
    const { isOpen: uploadModalOpen, onOpen: onUploadModalOpen, onClose: onUploadModalClose } = useDisclosure();
    const { isOpen: itemModalOpen, onOpen: onItemModalOpen, onClose: onItemModalClose } = useDisclosure();
    const { isOpen: deleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { isOpen: OutfitModalOpen, onOpen: onOutfitModalOpen, onClose: onOutfitModalClose } = useDisclosure();

    // Gallery states
	const [clothesPicture, setClothesPicture] = useState();
    const [galleryData, setGalleryData] = useState([]);
    const [filteredGallery, setFilteredGallery] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [uploadingStatus, setUploadingStatus] = useState(false);
    const [deletingStatus, setDeletingStatus] = useState(false);
    const [multiDeleteStatus, setMultiDeleteStatus] = useState(false);
    const [multiOutfitStatus, setMultiOutfitStatus] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [loadingGallery, setLoadingGallery] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Styling assistant states
    const [collapsed, setCollapsed] = useState(true);
    const [chatInput, setChatInput] = useState("");
    const [queryLog, setQueryLog] = useState([]);
    const [responseLog, setResponseLog] = useState([]);
    
    // Refs
    const questionnaireRef = useRef({});
    const uploadName = useRef('');
    const uploadCategory = useRef({});
    const selectedItem = useRef({});
    
    // Sheets snap
    const sheetRef = useRef();
    const snapTo = (i) => sheetRef.current?.snapTo(i);

    const openStylist = () => {
        setCollapsed(false);
    }

    const handleQuery = async (event) => {
        
        let userInput, imageFlag;

        if (typeof(event) === "object") {
            event.preventDefault();

            imageFlag = false;

            // Catching empty inputs
            if (!event.target[0].value.trim()) {
                return;
            }

            userInput = event.target[0].value.trim();
        }
        else {
            imageFlag = true;
            userInput = event;
        }

        setQueryLog(prevState => [...prevState, userInput]);

        setChatInput('');

        const API = 'http://127.0.0.1:8000/langserve/';
        // const API = 'https://styling-assistant-bqhufkgsnq-uc.a.run.app/langserve/';

        const response = await fetch(API,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "text": userInput,
                "questionnaire": questionnaireRef.current,
                "imageFlag": imageFlag
            })
        });

        // Here we start prepping for the streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const loopRunner = true;
        const imgLabel = /!\[.*?\]/g;
        const imgLink = /(\(https?:\/\/encrypted-tbn.*\))/g;

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

    const loadCloset = async () => {
        const closetRef = collection(db, "virtual-closet");

        const items = query(closetRef,
            where(documentId(), "==", "items"));

        const closetSnapshot = await getDocs(items);
        closetSnapshot.forEach(doc => {
            const userItems = doc.data()[FirebaseAuth.currentUser.uid];
            
            if (userItems !== undefined) {
                setLoadingGallery(false);
                setGalleryData(userItems);
                setFilteredGallery(userItems);
            }
            else if (userItems === undefined) {
                // Makes the spinner disappear if the user has no items
                setLoadingGallery(false);
            }
        });
    }

    useEffect(() => {
        loadCloset();
    }, []);

    const handleToggleSelect = () => {
        // Resetting all the checkboxes
        // when select mode is toggled
        for (const item of galleryData) {
            window[item.storageName] = false;
        }

        setSelectMode(prevState => {
            console.log(prevState);
            if (prevState) {
                setSelectedItems([]);
            }
            return !prevState;
        });
    }

    const handleItemClick = item => {
        selectedItem.current = item;
        onItemModalOpen();
    }

    const handleItemSelect = item => {
        if (selectedItems.filter(currItem => currItem.storageName === item.storageName).length) {
            window[item.storageName] = false;
            setSelectedItems(prevState => {
                return prevState.filter(currItem => currItem.storageName !== item.storageName);
            });
        }
        else {
            window[item.storageName] = true;
            setSelectedItems(prevState => {
                return [...prevState, item];
            });
        }
    }

    const galleryFilter = (category, galleryData) => {
        const filterData = galleryData.filter((item) => item.category === category);
        setSelectedCategory(category);
        setFilteredGallery(filterData);
    };

    const GalleryItem = ({ item }) => (
        <label className={styles['item-label']} onClick={!selectMode ? () => handleItemClick(item) : undefined}>
            <input
                type="checkbox" 
                disabled={!selectMode}
                checked={window[item.storageName]}
                onChange={() => {
                    handleItemSelect(item);
                }}
                className={`${styles.checkbox} ${selectMode && styles['checkbox-visible']}`} 
            />
            <div className={styles['gallery-item']}>
                <img
                    className={styles['clothes-image']}
                    src={item.url}
                    alt={item.displayName}
                    loading="lazy" 
                />
            </div>
        </label>

    );

    return (
        <main className={styles['page-main']}>
            <StylingAssistant
                collapsed={collapsed}
                chatInput={chatInput}
                queryLog={queryLog}
                setCollapsed={setCollapsed} 
                handleQuery={handleQuery}
                questionnaireRef={questionnaireRef}
                responseLog={responseLog}
                setChatInput={setChatInput} />
            <div className={styles['closet-container']}>
                <DashboardNavbar />
                <h1 className={styles['closet-title']}>My Closet</h1>
                <div className={styles['closet-options']}>
                    <div className={styles['closet-category-container']}>
                        <button
                            className={`${styles['closet-category-button']} ${selectedCategory === 'all' && styles['category-button-active']}`}
                            onClick={() => {
                                setFilteredGallery(galleryData);
                                setSelectedCategory('all');
                            }}>
                                All
                        </button>
                        <button
                            className={`${styles['closet-category-button']} ${selectedCategory === 'top' && styles['category-button-active']}`}
                            onClick={() => galleryFilter('top', galleryData)}>
                                <IoShirtOutline className={styles.icon} />
                                Tops
                        </button>
                        <button
                            className={`${styles['closet-category-button']} ${selectedCategory === 'bottom' && styles['category-button-active']}`}
                            onClick={() => galleryFilter('bottom', galleryData)}>
                                <PiPantsDuotone className={styles.icon} />
                                Bottoms
                        </button>
                        <button
                            className={`${styles['closet-category-button']} ${selectedCategory === 'shoe' && styles['category-button-active']}`}
                            onClick={() => galleryFilter('shoe', galleryData)}>
                                <PiSneaker className={styles.icon} />
                                Shoes
                        </button>
                        <button
                            className={`${styles['closet-category-button']} ${selectedCategory === 'accessory' && styles['category-button-active']}`}
                            onClick={() => galleryFilter('accessory', galleryData)}>
                                <GiCrystalEarrings className={`${styles.icon} ${styles['accessory-icon']}`} />
                                Accessories
                        </button>        
                        <button
                            className={`${styles['closet-category-button']} ${selectedCategory === 'outfit' && styles['category-button-active']}`}
                            onClick={() => galleryFilter('outfit', galleryData)}>
                                <GiClothes className={`${styles.icon} ${styles['accessory-icon']}`} />
                                Outfits
                        </button>                 
                    </div>
                    <button
                        className={
                            `${styles['closet-select-button']} ${selectMode && styles['select-button-active']}`}
                        onClick={handleToggleSelect}>
                            <PiCursorClickFill className={styles.icon} />
                            <span className={styles.spacer} />
                            Select
                    </button>   
				</div>
                <div>
                    <div className={styles['closet-gallery-container']}>
                        { loadingGallery ? (
                            <Spinner size='lg' /> 
                        ) : filteredGallery.length > 0 ? (
                            filteredGallery.map(item => <GalleryItem key={item.storageName} item={item} />)
                        ) : (
                            <p className={styles['closet-gallery-empty']}>
                                No items found for this category.
                            </p>
                        )}
                    </div>
                </div>
                <button
                    className={`${styles['closet-add-button']} ${selectMode && styles['add-button-disabled']}`}
                    onClick={onUploadModalOpen}>
                        <IoMdAdd color="white" size={32} />
                </button>
            </div>
            <UploadModal
                isOpen={uploadModalOpen}
                onClose={onUploadModalClose}
                clothesPicture={clothesPicture}
                setClothesPicture={setClothesPicture}
                uploadingStatus={uploadingStatus}
                setUploadingStatus={setUploadingStatus}
                uploadName={uploadName} 
                uploadCategory={uploadCategory}
                setGalleryData={setGalleryData}
                selectedCategory={selectedCategory}
                setFilteredGallery={setFilteredGallery} 
            />
            <ItemModal
                isOpen={itemModalOpen}
                onClose={onItemModalClose}
                deletingStatus={deletingStatus}
                setDeletingStatus={setDeletingStatus}
                selectedItem={selectedItem.current}
                selectedCategory={selectedCategory}
                setGalleryData={setGalleryData}
                setFilteredGallery={setFilteredGallery}
                handleQuery={handleQuery}
                openStylist={openStylist}
            />
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={onDeleteModalClose}
                deletingStatus={multiDeleteStatus}
                setDeletingStatus={setMultiDeleteStatus}
                selectedItems={selectedItems}
                setGalleryData={setGalleryData}
                setFilteredGallery={setFilteredGallery}
                handleToggleSelect={handleToggleSelect} 
            />
            <OutfitModal
                isOpen={OutfitModalOpen}
                onClose={onOutfitModalClose}
                deletingStatus={multiOutfitStatus}
                setDeletingStatus={setMultiOutfitStatus}
                selectedItems={selectedItems}
                setGalleryData={setGalleryData}
                setFilteredGallery={setFilteredGallery}
                handleToggleSelect={handleToggleSelect} 
            />
            <Sheet
                ref={sheetRef}
                isOpen={selectMode}
                disableScrollLocking={true}
                onClose={handleToggleSelect}
                disableDrag={false}
                snapPoints={[90, 0]}
                onSnap={snapIndex =>
                    console.log('> Current snap point index:', snapIndex)
                }
            >
                    <Sheet.Container>
                        <Sheet.Header className={styles['sheet-modal-header']}>
                            <button onClick={() => snapTo(1)}>
                                <IoIosArrowDown className={styles['down-arrow']} color="white" size={25}  />
                            </button>
                        </Sheet.Header>
                        <Sheet.Content className={styles['sheet-modal-container']}>
                            <p className={styles['sheet-modal-content']}>
                                <p className={styles['sheet-modal-label']}>
                                    {`${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`}
                                </p>
                                <div className={styles['sheet-modal-button-container']}>
                                    <button
                                        className={styles['sheet-modal-create-oufit']}
                                        disabled={OutfitModalOpen}
                                        onClick={() => {
                                            if (!selectedItems.length) {
                                                toast.error("Please select at least 1 item!");
                                                return;
                                            } 
                                            else if (selectedItems.length > 8) {
                                                toast.error("Please select a max of 8 items!");
                                                return;
                                            }
                                            onOutfitModalOpen();
                                        }} 
                                    >
                                        Create Outfit
                                    </button>
                                    <button
                                        className={styles['sheet-modal-button']}
                                        disabled={deleteModalOpen}
                                        onClick={() => {
                                            if (!selectedItems.length) {
                                                toast("Please select at least one item!");
                                                return;
                                            }
                                            onDeleteModalOpen();
                                        }} 
                                    >
                                        Delete Selected
                                    </button>
                                </div>
                            </p>
                        </Sheet.Content>
                    </Sheet.Container>
                    <Sheet.Backdrop />
                </Sheet>
        </main>
    );
};

export default Closet;