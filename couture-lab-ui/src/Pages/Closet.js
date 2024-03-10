// Utility-related modules
import { useState, useEffect, useRef } from 'react';
import
{
    collection, query, documentId, where, getDocs
} from 'firebase/firestore';
import { db, FirebaseAuth } from '../Utilities/firebase';

// UI-related modules
import { useDisclosure } from '@chakra-ui/react';
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
    const { isOpen: uploadModalOpen, onOpen: onUploadModalOpen, onClose: onUploadModalClose } = useDisclosure();
    const { isOpen: itemModalOpen, onOpen: onItemModalOpen, onClose: onItemModalClose } = useDisclosure();
    const { isOpen: deleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { isOpen: OutfitModalOpen, onOpen: onOutfitModalOpen, onClose: onOutfitModalClose } = useDisclosure();

	const [clothesPicture, setClothesPicture] = useState();
    const [galleryData, setGalleryData] = useState([]);
    const [filteredGallery, setFilteredGallery] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [uploadingStatus, setUploadingStatus] = useState(false);
    const [deletingStatus, setDeletingStatus] = useState(false);
    const [multiDeleteStatus, setMultiDeleteStatus] = useState(false);
    const [multiOutfitStatus, setMultiOutfitStatus] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const uploadName = useRef('');
    const uploadCategory = useRef({});
    const selectedItem = useRef({});
    
    // Sheets snap
    const sheetRef = useRef();
    const snapTo = (i) => sheetRef.current?.snapTo(i);

    const loadCloset = async () => {
        const closetRef = collection(db, "virtual-closet");

        const items = query(closetRef,
            where(documentId(), "==", "items"));

        const closetSnapshot = await getDocs(items);
        closetSnapshot.forEach(doc => {
            const userItems = doc.data()[FirebaseAuth.currentUser.uid];
            
            if (userItems !== undefined) {
                setGalleryData(userItems);
                setFilteredGallery(userItems);
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
            <StylingAssistant />
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
                        {filteredGallery.length > 0 ? (
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
                                <IoIosArrowDown className={styles['down-arrow']} color="white" size={32}  />
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
                                                toast("Please select at least one item!");
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