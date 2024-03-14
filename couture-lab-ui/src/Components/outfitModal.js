// Utility-related modules
import { useState } from 'react';
import { db, FirebaseAuth } from '../Utilities/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogCloseButton, Progress, Input
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import styles from '../PageStyles/Modal.module.css';


export default function OutfitModal({ 
    isOpen, 
    onClose, 
    deletingStatus, 
    setDeletingStatus, 
    selectedItems, 
    setGalleryData, 
    setFilteredGallery, 
    handleToggleSelect 
}) {
    const [outfitName, setOutfitName] = useState('');

    const handleCreateOutfit = async () => {
        // Checks if input has outfit name
        if (outfitName === '') {
            toast.error('Please add a name for the outfit!');
            return;
        }

        const outfitsRef = doc(db, 'virtual-closet', 'outfits');

        const storageNames = selectedItems.map((item) => item.storageName);

        const newItem = {
            [FirebaseAuth.currentUser.uid]: {
                // outfitName as array and value for userID map
                [outfitName]: arrayUnion(...storageNames),
            }
        };

        const updateObj = newItem;
        await updateDoc(outfitsRef, updateObj);

        toast.success("Created outfit!");
        handleCloseModal();
    }

    // Reset outfitName when modal is closed
    const handleCloseModal = () => {
        setOutfitName(''); 
        onClose();
    };

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            onClose={handleCloseModal}
            closeOnEsc={false}
            closeOnOverlayClick={!deletingStatus}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />
            <AlertDialogContent className={styles['closet-dialog-content']}>
                <AlertDialogHeader>
                    {`Create a outfit from ${selectedItems.length} ${selectedItems.length === 1 ? "item?" : "items?"}`}
                </AlertDialogHeader>
                
                <AlertDialogCloseButton className={`${deletingStatus && styles['closet-upload-disabled']}`}/>
                <AlertDialogBody>
                    <label className={styles['closet-dialog-outfit-name']}>Outfit Name</label>
                    <Input 
                        className={styles['closet-input-name-outfit']}
                        placeholder="Set the outfit name"
                        onChange={(e) => setOutfitName(e.target.value)}
                    />
                    { deletingStatus ? <Progress isIndeterminate colorScheme="teal" /> :
                    <button 
                        className={styles['closet-merge-button']}
                        onClick={handleCreateOutfit}
                    >
                        Confirm
                    </button>
                    }
                </AlertDialogBody>
            </AlertDialogContent> 
        </AlertDialog>
    )
}