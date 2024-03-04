// Utility-related modules
import { useContext } from 'react';
import { deleteUser } from 'firebase/auth';
import { doc, deleteField, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, FirebaseAuth } from '../Utilities/firebase';
import { AuthContext } from '../Utilities/authcontext';

// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogFooter, Button
} from '@chakra-ui/react';
import { toast } from 'react-toastify';


const DeleteAccountModal = ({isOpen, onClose}) => {
    // Redirect management
    const navigate = useNavigate();
    // Logout user function
    let { logoutUser } = useContext(AuthContext);

    const deleteAccount = async () => {
        const questionnaireRef = doc(db, 'virtual-closet', 'questionnaires');
        // Deletes user styling preferences in Firestore Database
        await updateDoc(questionnaireRef, {
           [FirebaseAuth.currentUser.uid]: deleteField()
        });
        // Closes dialog
        onClose();

        // Deletes user account
        deleteUser(FirebaseAuth.currentUser).then(() => {
            toast.success('Deleted account');
        }).catch((error) => {
            // Firebase needs to reauthenticate if user has not signed in a while
            toast.error('Failed to delete account. You may need to sign in again.');
            console.log(error);
        });
        
        logoutUser();
        navigate('/signin');
    }

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>
                    Delete Account?
                </AlertDialogHeader>
                <AlertDialogBody>
                    Are you sure? You can't undo this.
                </AlertDialogBody>  
                <AlertDialogFooter>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={deleteAccount} ml={3}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAccountModal;