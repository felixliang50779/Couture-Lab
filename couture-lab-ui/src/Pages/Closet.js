// Utility-related modules
import { useState, useEffect, useRef } from 'react';
import { uploadBytes, ref } from 'firebase/storage';
import { doc, updateDoc, arrayUnion} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { storage, db, FirebaseAuth } from '../Utilities/firebase';

// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogCloseButton, Select, useDisclosure, Input,
    Progress
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { AiOutlineCloudUpload } from "react-icons/ai";
import DashboardNavbar from '../Components/dashboardnavbar';
import styles from './Closet.module.css';

const Closet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [filteredGallery, setFilteredGallery] = useState([]);
	const [clothesPicture, setClothesPicture] = useState();
    const [galleryData,] = useState([]);
    const [uploadingStatus, setUploadingStatus] = useState(false);

    
    const uploadName = useRef('');
    const uploadCategory = useRef('');

    const loadCloset = async () => {
        
    }

    useEffect(() => {

        loadCloset();
    }, []);

    const galleryFilter = (category) => {
        const filterData = galleryData.filter((item) => item.category === category);
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

        const storageName = uuidv4();

		const storageRef = ref(storage, storageName);

        setUploadingStatus(true);

        await uploadBytes(storageRef, picture);

        toast("Item added successfully!");
        handleClose();
        setUploadingStatus(false);

        const usersRef = doc(db, 'virtual-closet', 'images');

        let updateObj = {}
        updateObj[FirebaseAuth.currentUser.uid] = arrayUnion(
            {
                category: itemCategory,
                name: itemName,
                url: `https://firebasestorage.googleapis.com/v0/b/couture-lab-backend.appspot.com/o/${storageName}?alt=media`
            }
        );

        await updateDoc(usersRef, updateObj);
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
                        { uploadingStatus ? <Progress isIndeterminate colorScheme="black" /> :
                        clothesPicture ? <img src={URL.createObjectURL(clothesPicture)} alt='clothesPic' loading='lazy' /> :
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
                                <option value='shoe'>Shoes</option>
                                <option value='accessory'>Accessories</option>
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
        <div key={item.id} className="galleryItem">
            <img className={styles['clothes-image']} src={item.image} alt={`Clothing ${item.id}`} />
        </div>
    );

    return (
        <main>
            <div className={styles['closet-container']}>
                <DashboardNavbar />
                <h1 className={styles['closet-title']}>My Closet</h1>
                <div className={styles['closet-button-categories']}>
					<button className={styles['closet-category-button']} onClick={onOpen}>Add Item</button>
					<button className={styles['closet-category-button']} onClick={() => setFilteredGallery(galleryData)}>
						All
					</button>
					<button className={styles['closet-category-button']} onClick={() => galleryFilter('top')}>
						Top
					</button>
					<button className={styles['closet-category-button']} onClick={() => galleryFilter('bottom')}>
						Bottom
					</button>
					<button className={styles['closet-category-button']} onClick={() => galleryFilter('shoe')}>
						Shoes
					</button>
					<button className={styles['closet-category-button']} onClick={() => galleryFilter('accessory')}>
						Accessories
					</button>
				</div>
                <div>
                    <div className={styles['closet-gallery-container']}>
                        {filteredGallery.length > 0 ? (
                            filteredGallery.map((item) => <GalleryItem key={item.id} item={item} />)
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