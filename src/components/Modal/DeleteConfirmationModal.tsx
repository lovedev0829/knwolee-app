import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    title?: string;
    text?: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> =
    ({ isOpen, onClose, onDelete, title = "Delete Confirmation", text = "Are you sure you want to delete this item?" }) => {
        const modalCloseButtonColor = useColorModeValue("neutral.40", "neutral.70");
        const modalContnetBgColor = useColorModeValue("#FFF", "neutral.100");
        const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
        const subHeadingTextColor = useColorModeValue("neutral.60", "neutral.50");

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    bg={modalContnetBgColor}
                >
                    <ModalHeader
                        color={headingTextColor}
                    >
                        {title}
                    </ModalHeader>
                    <ModalCloseButton color={modalCloseButtonColor} />
                    <ModalBody
                        color={subHeadingTextColor}
                    >
                        {text}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" ml={3} onClick={onDelete}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };

export default DeleteConfirmation;
