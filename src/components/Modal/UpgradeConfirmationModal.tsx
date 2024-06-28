import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    ModalProps,
    ButtonProps,
    useColorModeValue,
} from "@chakra-ui/react";

interface Props extends Omit<ModalProps, "children"> {
    onConfirm: () => void;
    title?: string;
    text?: string;
    confirmButtonProps?: ButtonProps;
}

function UpgradeConfirmationModal({
    onConfirm,
    onClose,
    confirmButtonProps,
    title = "Are you sure you want to update Subscription?",
    text = "Your Subscription plan will be updated and amount will be automatically deducted from your previous payment method",
    ...otherProps
}: Props) {
    const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
    const backgroundColor = useColorModeValue(undefined, "neutral.100");
    const cancelButtonBGColor = useColorModeValue(undefined, "neutral.80");
    const modalOverlayBGColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    return (
        <Modal isCentered={true} onClose={onClose} {...otherProps}>
            <ModalOverlay bg={modalOverlayBGColor} />
            <ModalContent
                borderRadius="24px"
                maxWidth="504px"
                p={["30px 20px", "40px 20px", "48px 40px"]}
                boxSizing="content-box"
                backgroundColor={backgroundColor}
            >
                <ModalHeader
                    color={headingTextColor}
                    textAlign="center"
                    fontFamily="Roboto"
                    fontSize="20px"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="28px"
                    py="0"
                >
                    {title}
                </ModalHeader>
                <ModalBody pt="16px" pb="0">
                    <Text
                        color="neutral.50"
                        textAlign="center"
                        fontFamily="Roboto"
                        fontSize="16px"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="24px"
                    >
                        {text}
                    </Text>
                </ModalBody>
                <ModalFooter
                    pt="40px"
                    pb="0"
                    display="flex"
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                    gap="24px"
                >
                    <Button
                        onClick={onConfirm}
                        borderRadius="10px"
                        colorScheme="blue"
                        color="neutral.10"
                        fontSize="16px"
                        fontFamily="Roboto"
                        fontWeight="500"
                        height="48px"
                        lineHeight="24px"
                        minWidth="107px"
                        p="12px 0"
                        bg="red"
                        _hover={{ bg: "red" }}
                        {...confirmButtonProps}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={onClose}
                        borderRadius="10px"
                        color={headingTextColor}
                        fontSize="16px"
                        fontFamily="Roboto"
                        fontWeight="500"
                        lineHeight="24px"
                        py="12px"
                        minWidth="107px"
                        height="48px"
                        bg={cancelButtonBGColor}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default UpgradeConfirmationModal;
