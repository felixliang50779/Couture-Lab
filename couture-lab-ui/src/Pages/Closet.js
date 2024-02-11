import { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogCloseButton, Select, useDisclosure } from '@chakra-ui/react';

import DashboardNavbar from '../Components/dashboardnavbar';
import styles from './Closet.module.css';

import outfit from '../Assets/Images/outfit-history.png';
import GreenDressImage from '../Assets/Images/green-dress.jpg';
import WardrobeImage from '../Assets/Images/wardrobe.jpg';
import LongwearImage from '../Assets/Images/longwear.jpg';
import CalendarImage from '../Assets/Images/calendar.png';
import StylingRecommendImage from '../Assets/Images/styling-image.png';


const GalleryData = [
    { id: 1, category: 'top', image: outfit },
    { id: 2, category: 'top', image: GreenDressImage },
    { id: 3, category: 'top', image: WardrobeImage },
    { id: 4, category: 'shoe', image: LongwearImage },
    { id: 5, category: 'bottom', image: CalendarImage },
    { id: 6, category: 'shoe', image: StylingRecommendImage },
];

const Closet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
	const [ClothesPicture, setClothesPicture] = useState();

    useEffect(() => {
        setData(GalleryData);
    }, []);

    const galleryFilter = (category) => {
        const filterData = GalleryData.filter((item) => item.category === category);
        setData(filterData);
    };

	const handleAddIt = () => {
		console.log('add it button clicked');
	}

    const AlertDialogComponent = () => (
        <AlertDialog
            motionPreset='slideInBottom'
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay /> 
            <AlertDialogContent className={styles['closet-dialog-content']}>
                <AlertDialogHeader className={styles['add-clothes-header']}>ADD YOUR CLOTHES</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    <label className={styles['closet-upload']}>
						<input type='file' hidden accept=".jpg,.png" 
							onChange={(e) => setClothesPicture(e.target.files[0])}
						/> {/* input extends out of the svg, fix later */}
						{/* uploading the pic reloads the dialog, will have to fix later */}
						{ClothesPicture ? (
							<img src={URL.createObjectURL(ClothesPicture)} alt='clothesPic' loading='lazy' />
						) : (
							<svg className={styles['closet-upload-svg']} 
								viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier"> 
									<path d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z" fill="#000000"></path> 
									<path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="#000000"></path> 
								</g>
							</svg>
						)}
                    </label>
					<div className={styles['closet-dialog-user-interaction']}>
						<label className={styles['closet-dialog-label']}>Clothing name</label>
						<input type="text" className={styles['closet-input-name']} placeholder="Set an item name" />
						<label className={styles['closet-dialog-label']}>Select Category</label>
						<Select placeholder='Select one from here'>
							<option value='top'>Top</option>
							<option value='bottom'>Bottom</option>
							<option value='shoe'>Shoes</option>
							<option value='accessory'>Accessories</option>
						</Select>
					</div>
					<button className={styles['closet-addit-button']} onClick={handleAddIt}>Add it</button>
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
                <h1 className={styles['closet-title']}>Your Closet</h1>
                <div className={styles['closet-button-categories']}>
					<button className={styles['closet-category-button']} onClick={onOpen}>Add Clothes</button>
					<button className={styles['closet-category-button']} onClick={() => setData(GalleryData)}>
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