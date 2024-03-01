// Utility-related modules
import { deleteObject, ref } from 'firebase/storage';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { storage, db, FirebaseAuth } from '../Utilities/firebase';

// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogCloseButton, Progress
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import styles from '../PageStyles/Modal.module.css';


export default function DeleteModal({ isOpen, onClose, deletingStatus, setDeletingStatus, selectedItems, setGalleryData, setFilteredGallery, handleToggleSelect }) {

    const handleClose = () => {
        setDeletingStatus(false);
        onClose();
    }

    const handleDelete = async () => {
        setDeletingStatus(true);

        const storageDeletionPromises = [];
        for (const item of selectedItems) {
            const storageRef = ref(storage, item.storageName);

            storageDeletionPromises.push(deleteObject(storageRef));
        }

        // Process deletions from storage concurrently
        try {
            await Promise.all(storageDeletionPromises);
        }
        catch (e) {
            toast("An Error Occurred!" + e);
            handleClose();
            return;
        }

        toast("Items deleted successfully!");
        handleClose();

        const itemsRef = doc(db, 'virtual-closet', 'items');

        const databaseDeletionPromises = [];
        for (const item of selectedItems) {
            const deletedItem = 
            {
                category: item.category,
                storageName: item.storageName,
                displayName: item.displayName,
                url: item.url
            };
    
            let updateObj = {};
            updateObj[FirebaseAuth.currentUser.uid] = arrayRemove(deletedItem);

            databaseDeletionPromises.push(updateDoc(itemsRef, updateObj));
        }

        await Promise.all(databaseDeletionPromises);

        handleToggleSelect();

        const storageNames = selectedItems.map(item => item.storageName);

        setGalleryData(prevState => {
            return prevState.filter(item => !storageNames.includes(item.storageName));
        });

        setFilteredGallery(prevState => {
            return prevState.filter(item => !storageNames.includes(item.storageName));
        });
    }


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
                <AlertDialogHeader>{`Delete ${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"}`}</AlertDialogHeader>
                <AlertDialogCloseButton className={`${deletingStatus && styles['closet-upload-disabled']}`}/>
                <AlertDialogBody>
                    { deletingStatus ? <Progress isIndeterminate colorScheme="teal" /> :
                    <button 
                        className={styles['closet-delete-button']}
                        onClick={handleDelete}>
                            Confirm
                    </button>
                    }
                </AlertDialogBody>
            </AlertDialogContent> 
        </AlertDialog>
    )
}