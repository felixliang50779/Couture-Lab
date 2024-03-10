// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogCloseButton, Progress, Input
} from '@chakra-ui/react';

import styles from '../PageStyles/Modal.module.css';


export default function OutfitModal({ isOpen, onClose, deletingStatus, setDeletingStatus, selectedItems, setGalleryData, setFilteredGallery, handleToggleSelect }) {
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
                    Create Outfit
                </AlertDialogHeader>
                
                <AlertDialogCloseButton className={`${deletingStatus && styles['closet-upload-disabled']}`}/>
                <AlertDialogBody>
                    <h1>
                        {`Create a outfit from ${selectedItems.length} ${selectedItems.length === 1 ? "item?" : "items?"}`}
                    </h1>
                    <label className={styles['closet-dialog-outfit-name']}>Outfit Name</label>
                    <Input 
                        className={styles['closet-input-name-outfit']}
                        placeholder="Set the outfit name"
                    />
                    { deletingStatus ? <Progress isIndeterminate colorScheme="teal" /> :
                    <button 
                        className={styles['closet-merge-button']}
                    >
                        Confirm
                    </button>
                    }
                </AlertDialogBody>
            </AlertDialogContent> 
        </AlertDialog>
    )
}