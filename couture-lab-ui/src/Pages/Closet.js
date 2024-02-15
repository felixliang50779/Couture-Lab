import { useState, useEffect, useRef } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogCloseButton, Select, useDisclosure, Input } from '@chakra-ui/react';
import { uploadBytes, ref, list, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { AiOutlineCloudUpload } from "react-icons/ai";
    
import { storage } from '../Utilities/firebase';

import DashboardNavbar from '../Components/dashboardnavbar';
import styles from './Closet.module.css';

const Closet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
	const [clothesPicture, setclothesPicture] = useState();
    const [galleryData, setgalleryData] = useState([]);

    const uploadName = useRef('');

    const loadCloset = async () => {
        const listRef = ref(storage);
        const listResult = await list(listRef);

        let id = 1;
        for (const image of listResult.items) {
            const url = await getDownloadURL(ref(storage, image.fullPath));
            galleryData.push({ id: id, category: 'top', image: url});
            id += 1;
        }

        setData(galleryData);
    }

    useEffect(() => {
        loadCloset();
    }, []);

    const galleryFilter = (category) => {
        const filterData = galleryData.filter((item) => item.category === category);
        setData(filterData);
    };

    const handleClose = () => {
        setclothesPicture(null);
        onClose();
    }

	const handleAdd = async (picture, pictureName) => {
		const storageRef = ref(storage, pictureName);

        await uploadBytes(storageRef, picture);
        toast("Item added successfully!");
        handleClose();
	}

    const AlertDialogComponent = () => (
        <AlertDialog
            motionPreset='slideInBottom'
            onClose={handleClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay /> 
            <AlertDialogContent className={styles['closet-dialog-content']}>
                <AlertDialogHeader className={styles['add-clothes-header']}>
                    New Item
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    <label className={styles['closet-upload']}>
						<input type='file' hidden accept=".jpg,.png"
							onChange={(e) => setclothesPicture(e.target.files[0])}
						/>
                        {clothesPicture ? <img src={URL.createObjectURL(clothesPicture)} alt='clothesPic' loading='lazy' /> :
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
                            className={styles['closet-input-name']}
                            placeholder="Set the item name"
                            onChange={e => uploadName.current = e.target.value} />
						<label className={styles['closet-dialog-label']}>Select Category</label>
						<Select placeholder='Choose a category for your item'>
							<option value='top'>Top</option>
							<option value='bottom'>Bottom</option>
							<option value='shoe'>Shoes</option>
							<option value='accessory'>Accessories</option>
						</Select>
					</div>
					<button className={styles['closet-add-button']} onClick={() => handleAdd(clothesPicture, uploadName.current)}>Add</button>
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
					<button className={styles['closet-category-button']} onClick={() => setData(galleryData)}>
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
                        {data.length > 0 ? (
                            data.map((item) => <GalleryItem key={item.id} item={item} />)
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