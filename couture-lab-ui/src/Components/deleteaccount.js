// UI-related modules
import {
    AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, 
	AlertDialogOverlay, AlertDialogFooter, Button
} from '@chakra-ui/react';

const DeleteAccountModal = ({isOpen, onClose}) => {

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
                    <Button colorScheme='red' onClick={onClose} ml={3}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAccountModal;