import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Image,
    useColorModeValue,
} from "@chakra-ui/react";

interface EnlargeImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
}

const EnlargeImageModal = ({
    isOpen,
    onClose,
    src,
}: EnlargeImageModalProps) => {
    const modalCloseButtonColor = useColorModeValue("neutral.40", "neutral.70");
    const modalContnetBgColor = useColorModeValue("#FFF", "neutral.100");

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent
                bg={modalContnetBgColor}
            >
                <ModalCloseButton color={modalCloseButtonColor} />
                <Image src={src} rounded="md" />
            </ModalContent>
        </Modal>
    );
};

export default EnlargeImageModal;
