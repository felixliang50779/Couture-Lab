// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogCloseButton, Progress
} from '@chakra-ui/react';

import styles from '../PageStyles/Modal.module.css';


export default function MergeModal({ isOpen, onClose, deletingStatus, setDeletingStatus, selectedItems, setGalleryData, setFilteredGallery, handleToggleSelect }) {
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
                        {`Create outfit from ${selectedItems.length} ${selectedItems.length === 1 ? "item?" : "items?"}`}
                    </h1>
                    <h1>Merge Picture</h1>
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