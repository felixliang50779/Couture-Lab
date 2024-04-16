// Utility-related modules
import { useEffect, useState, useCallback } from 'react';
import { collection, query, documentId, where, getDocs, doc, deleteField, setDoc } from 'firebase/firestore';
import { db, FirebaseAuth } from '../Utilities/firebase';

// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
    AlertDialogOverlay, AlertDialogCloseButton, Spinner
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import styles from '../PageStyles/Modal.module.css';


export default function OutfitItemModal({
    onClose, isOpen, deletingStatus, selectedOutfit,
}) {
    const [outfitImages, setOutfitImages] = useState([]);
    const [outfitImagesLoading, setOutfitImagesLoading] = useState(true);

    const loadOutfitImages = useCallback(async () => {
        const closetRef = collection(db, "virtual-closet");
        const items = query(closetRef, where(documentId(), "==", "outfits"));
        const closetSnapshot = await getDocs(items);

        const outfitData = closetSnapshot.docs[0].data();
        const userOutfits = outfitData[FirebaseAuth.currentUser.uid];

        const outfitURLs = userOutfits[selectedOutfit];
        // Stores outfitURLs in outfitImages array
        setOutfitImages(outfitURLs);
        setOutfitImagesLoading(false);  
    }, [selectedOutfit]);

    useEffect(() => {
        if (isOpen) {
            loadOutfitImages();
        }
        else {
            setOutfitImages([]);
            setOutfitImagesLoading(true);
        }
    }, [isOpen, loadOutfitImages]);

    const handleDeleteOutfit = useCallback(async () => {
        try {
            const outfitRef = doc(db, 'virtual-closet', 'outfits');

            // Finds deleted outfit in firestore
            const deletedOutfit = {
                [FirebaseAuth.currentUser.uid]: {
                    [selectedOutfit]: deleteField()
                }
            };
            
            // Deletes outfit in firestore
            await setDoc(outfitRef, deletedOutfit, { merge: true });

            toast.success('Deleted outfit');
            onClose();

        } catch (error) {
            toast.error('Error deleting outfit');
        }
    }, [onClose, selectedOutfit]);

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            onClose={onClose}
            closeOnEsc={false}
            closeOnOverlayClick={!deletingStatus}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay /> 
            <AlertDialogContent className={styles['closet-dialog-content']}>
                <AlertDialogHeader>
                    {selectedOutfit}
                </AlertDialogHeader>
                <AlertDialogCloseButton className={`${deletingStatus && styles['closet-upload-disabled']}`}/>
                <AlertDialogBody display="flex" flexDirection="column" alignItems="center">
                    {outfitImagesLoading ? (
                        <Spinner size='lg' /> 
                    ) : (
                        <div className={styles["outfit-image-container"]}>
                            {outfitImages.map((url, index) => (
                                <img 
                                    className={styles['outfit-clothes-img']}
                                    key={index} 
                                    src={url} 
                                    alt={`Outfits Item ${index + 1}`} 
                                />
                            ))}
                        </div>
                    )}
                    <div className={styles['item-modal-buttons']}>
                        <button
                            className={`${styles['closet-delete-button']} ${deletingStatus && styles['closet-upload-disabled']}`}
                            onClick={handleDeleteOutfit}
                        >
                            Delete Outfit
                        </button>
                    </div>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    );
}
