// Utility-related modules
import { useState } from 'react';
import { db, FirebaseAuth } from '../Utilities/firebase';
import { collection, query, documentId, where, getDocs, arrayUnion, setDoc, doc } from 'firebase/firestore';

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
    selectedItems, 
}) {
    const [outfitName, setOutfitName] = useState('');

    // Probably has to be refactored
    const handleCreateOutfit = async () => {
        // Checks if input has outfit name
        if (outfitName === '') {
            toast.error('Please add a name for the outfit!');
            return;
        }

        let outfitNameUsed = false;
        let userOutfitDataExists = false;

        const colRef = collection(db, 'virtual-closet');
        const outfitRef = doc(db, 'virtual-closet', "outfits");
        const outfitItems = query(colRef,
            where(documentId(), "==", "outfits"));

        const outfitSnapshot = await getDocs(outfitItems);

        outfitSnapshot.forEach((doc) => {
            const userItems = doc.data()[FirebaseAuth.currentUser.uid];
            if (userItems) {
                userOutfitDataExists = true;
                // Checks if outfit name has already been used
                if (userItems[outfitName]) {
                    toast.error('Outfit name already used!');
                    outfitNameUsed = true;
                    return;
                }
                return;
            }
        });

        // Ends function if outfit name has already been used
        if (outfitNameUsed) {
            return;
        }

        // Ends function if outfit name has already been used
        const itemUrls = selectedItems.map((item) => item.url);

        const newOutfit = {
            [FirebaseAuth.currentUser.uid]: {
                // outfitName as array and value for userID map
                [outfitName]: arrayUnion(...itemUrls),
            }
        };
        
        if (userOutfitDataExists) {
            try {
                await setDoc(outfitRef, newOutfit, { merge: true });
                toast.success("Created outfit");
                handleCloseModal();
            }
            catch (error) {
                toast.error("Error creating outfit");
            }
        }
        else {
            try {
                await setDoc(outfitRef, newOutfit);
                toast.success("Created outfit");
                handleCloseModal();
            }
            catch (error) {
                toast.error("Error creating outfit");
            }
        }
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
            size="xl"
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