// Utility-related modules
import { useState, useEffect, useRef } from 'react';
import { collection, query, documentId, where, getDocs
} from 'firebase/firestore';
import { db, FirebaseAuth } from '../Utilities/firebase';

// UI-related modules
import { useDisclosure } from '@chakra-ui/react';
import { PiCursorClickFill, PiPantsDuotone, PiSneaker } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { IoShirtOutline } from "react-icons/io5";
import { GiCrystalEarrings } from "react-icons/gi";
import DashboardNavbar from '../Components/dashboardnavbar';
import UploadModal from '../Components/uploadModal';
import ItemModal from '../Components/itemModal';
import styles from '../PageStyles/Closet.module.css';


const Closet = () => {
    const { isOpen: uploadModalOpen, onOpen: onUploadModalOpen, onClose: onUploadModalClose } = useDisclosure();
    const { isOpen: itemModalOpen, onOpen: onItemModalOpen, onClose: onItemModalClose } = useDisclosure();

	const [clothesPicture, setClothesPicture] = useState();
    const [galleryData, setGalleryData] = useState([]);
    const [filteredGallery, setFilteredGallery] = useState([]);
    const [uploadingStatus, setUploadingStatus] = useState(false);
    const [deletingStatus, setDeletingStatus] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const uploadName = useRef('');
    const uploadCategory = useRef({});
    const selectedItem = useRef({});

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

    const handleItemClick = item => {
        selectedItem.current = item;
        onItemModalOpen();
    }

    const galleryFilter = (category, galleryData) => {
        const filterData = galleryData.filter((item) => item.category === category);
        setSelectedCategory(category);
        setFilteredGallery(filterData);
    };

    const GalleryItem = ({ item }) => (
        <div className={styles['gallery-item']} onClick={() => handleItemClick(item)}>
            <img
                className={styles['clothes-image']}
                src={item.url}
                alt={item.displayName}
                loading="lazy" />
        </div>
    );

    return (
        <main>
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
                    </div>
                    <button className={styles['closet-select-button']}>
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
                            <p>No items found for this category.</p>
                        )}
                    </div>
                </div>
                <button className={styles['closet-add-button']} onClick={onUploadModalOpen}>
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
                setFilteredGallery={setFilteredGallery} />
            <ItemModal
                isOpen={itemModalOpen}
                onClose={onItemModalClose}
                deletingStatus={deletingStatus}
                setDeletingStatus={setDeletingStatus}
                selectedItem={selectedItem.current}
                selectedCategory={selectedCategory}
                setGalleryData={setGalleryData}
                setFilteredGallery={setFilteredGallery} />
        </main>
    );
};

export default Closet;