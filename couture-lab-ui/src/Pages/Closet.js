// Utility-related modules
import { useState, useEffect, useRef } from 'react';
import { uploadBytes, ref } from 'firebase/storage';
import {
    doc, updateDoc, collection, query, arrayUnion, documentId, where, getDocs
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { storage, db, FirebaseAuth } from '../Utilities/firebase';
import FormData from 'form-data';

// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogCloseButton, Select, useDisclosure, Input,
    Progress
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { AiOutlineCloudUpload } from "react-icons/ai";
import ModalImage from "react-modal-image";
import DashboardNavbar from '../Components/dashboardnavbar';
import styles from './Closet.module.css';


const Closet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

	const [clothesPicture, setClothesPicture] = useState();
    const [galleryData, setGalleryData] = useState([]);
    const [filteredGallery, setFilteredGallery] = useState([]);
    const [uploadingStatus, setUploadingStatus] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const uploadName = useRef('');
    const uploadCategory = useRef('');

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

    const galleryFilter = (category, galleryData) => {
        const filterData = galleryData.filter((item) => item.category === category);
        setSelectedCategory(category);
        setFilteredGallery(filterData);
    };

    const handleClose = () => {
        setClothesPicture(null);
        onClose();
    }

	const handleAdd = async (picture, itemName, itemCategory) => {
        if (itemName.trim() === '' || itemCategory === '') {
            toast("Please add a name for the item and pick a category!");
            return;
        }

        const removebgKey = 'KAafDsCQvWoJLLnq2y3p8Q87';
        const removebgUrl = 'https://api.remove.bg/v1.0/removebg';

        const formData = new FormData();
        formData.append('image_file', picture, itemName);
        formData.append('size', 'auto');

        let processedPicture = null;

        // Generate unique name for the image to prevent
        // duplicates overwriting each other
        const storageName = uuidv4();

		const storageRef = ref(storage, storageName);

        setUploadingStatus(true);

        
        try {
            const res = await fetch(removebgUrl, {
                method: 'POST',
                headers: {
                    'X-api-key': removebgKey
                },
                body: formData
            });

            processedPicture = await res.blob();
        }
        catch (e) {
            console.log(e);
        }

        await uploadBytes(storageRef, processedPicture);

        toast("Item added successfully!");
        handleClose();
        setUploadingStatus(false);

        const itemsRef = doc(db, 'virtual-closet', 'items');

        const newItem = {
            category: itemCategory,
            name: itemName,
            url: `https://firebasestorage.googleapis.com/v0/b/couture-lab-backend.appspot.com/o/${storageName}?alt=media`
        }

        let updateObj = {}
        updateObj[FirebaseAuth.currentUser.uid] = arrayUnion(newItem);

        await updateDoc(itemsRef, updateObj);

        setGalleryData(prevState => {
            return [...prevState, newItem];
        });

        if (newItem.category === selectedCategory) {
            setFilteredGallery(prevState => {
                return [...prevState, newItem];
            });
        }
	}

    const AlertDialogComponent = () => (
        <AlertDialog
            motionPreset='slideInBottom'
            onClose={handleClose}
            closeOnEsc={false}
            closeOnOverlayClick={!uploadingStatus}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay /> 
            <AlertDialogContent className={styles['closet-dialog-content']}>
                <AlertDialogHeader className={styles['add-clothes-header']}>
                    New Item
                </AlertDialogHeader>
                <AlertDialogCloseButton className={`${uploadingStatus && styles['closet-upload-disabled']}`}/>
                <AlertDialogBody>
                    <label>
						<input type='file' hidden accept=".jpg,.png"
							onChange={(e) => setClothesPicture(e.target.files[0])}
						/>
                        { uploadingStatus ? <Progress isIndeterminate colorScheme="teal" /> :
                        clothesPicture ? <img className={styles['preview-image']} src={URL.createObjectURL(clothesPicture)} alt='clothesPic' loading='lazy' /> :
                        <div className={styles['closet-upload-input']}>
                            <AiOutlineCloudUpload size={40} />
                            <p className={styles['closet-input-header']}>
                                Upload Your Picture of the Item
                            </p>
                            <p className={styles['closet-input-caption']}>
                                Accepts .jpg or .png
                            </p>
                        </div> }
                    </label>
					<div className={styles['closet-dialog-user-interaction']}>
						<label className={styles['closet-dialog-label']}>Display Name</label>
						<Input
                            type="text"
                            focusBorderColor='black'
                            className={styles['closet-input-name']}
                            placeholder="Set the item name"
                            onChange={e => uploadName.current = e.target.value} />
						<label className={styles['closet-dialog-label']}>Select Category</label>
						<Select
                            placeholder='Choose a category for your item'
                            focusBorderColor='black'
                            ref={uploadCategory} >
                                <option value='top'>Top</option>
                                <option value='bottom'>Bottom</option>
                                <option value='shoe'>Shoe</option>
                                <option value='accessory'>Accessory</option>
						</Select>
					</div>
					<button
                        className={`${styles['closet-add-button']} ${uploadingStatus && styles['closet-upload-disabled']}`}
                        onClick={() => handleAdd(clothesPicture, uploadName.current, uploadCategory.current.value)}>
                            Add
                    </button>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    );

    const GalleryItem = ({ item }) => (
        <div key={item.id}>
            <ModalImage
                className={styles['clothes-image']}
                imageBackgroundColor="white"
                small={item.url}
                large={item.url}
                alt={item.name} />
        </div>
    );

    return (
        <main>
            <div className={styles['closet-container']}>
                <DashboardNavbar />
                <h1 className={styles['closet-title']}>My Closet</h1>
                <div className={styles['closet-button-categories']}>
					<button className={styles['closet-category-button']} onClick={onOpen}>
                        Add Item
                    </button>
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
						    Top
					</button>
					<button
                        className={`${styles['closet-category-button']} ${selectedCategory === 'bottom' && styles['category-button-active']}`}
                        onClick={() => galleryFilter('bottom', galleryData)}>
						    Bottom
					</button>
					<button
                        className={`${styles['closet-category-button']} ${selectedCategory === 'shoe' && styles['category-button-active']}`}
                        onClick={() => galleryFilter('shoe', galleryData)}>
						    Shoes
					</button>
					<button
                        className={`${styles['closet-category-button']} ${selectedCategory === 'accessory' && styles['category-button-active']}`}
                        onClick={() => galleryFilter('accessory', galleryData)}>
						    Accessories
					</button>
				</div>
                <div>
                    <div className={styles['closet-gallery-container']}>
                        {filteredGallery.length > 0 ? (
                            filteredGallery.map((item, index) => <GalleryItem key={index} item={item} />)
                        ) : (
                            <p>No items found for this category.</p>
                        )}
                    </div>
                </div>
            </div>
            <AlertDialogComponent />
        </main>
    );
};

export default Closet;