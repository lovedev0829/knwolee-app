import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useColorModeValue,
} from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    src: string;
}

const EnlargeVideoModal = ({ isOpen, onClose, src }: Props) => {
    const modalCloseButtonColor = useColorModeValue("neutral.40", "neutral.70");
    const modalContentBgColor = useColorModeValue("#FFF", "neutral.100");

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent bg={modalContentBgColor}>
                <ModalCloseButton color={modalCloseButtonColor} zIndex="docked" />
                <video
                    controls
                    style={{
                        borderRadius: "6px",
                        maxHeight: "80vh",
                    }}
                >
                    <source src={src} type="video/mp4" />
                </video>
            </ModalContent>
        </Modal>
    );
};

export default EnlargeVideoModal;
