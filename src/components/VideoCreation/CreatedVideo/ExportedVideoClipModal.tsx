import {
    Modal,
    ModalOverlay,
    ModalContent,
    useColorModeValue,
    Flex,
    Text,
    Button,
    ModalFooter,
    ModalHeader,
    Grid,
    ModalBody,
    GridItem,
    useToast,
} from "@chakra-ui/react";
import { KlapExportedClip } from "src/types/klap.interface";

interface Props {
    klapExportedClip: KlapExportedClip;
    isOpen: boolean;
    onClose: () => void;
}

function CreatedVideoModal({
    klapExportedClip,
    isOpen,
    onClose,
}: Props) {

    const toast = useToast();
    const modalContnetBgColor = useColorModeValue("white", "neutral.100");
    const modalHeaderColor = useColorModeValue("neutral.90", "neutral.10");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    async function copyToClipboard(text: string) {
        await navigator.clipboard.writeText(text);

        // Show success toast
        toast({
            title: "Copied successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
            <ModalOverlay bg={modalOverlayBgColor} />
            <ModalContent
                bg={modalContnetBgColor}
                padding="40px 20px 30px 32px"
                borderRadius={24}
                height="full"
            // overflow="auto"
            >
                <ModalBody padding={0}>
                    <Grid gridTemplateColumns="repeat(18, 1fr)" height="full"
                        display={["flex", "flex", "grid"]}
                        flexDirection={["column", "column", "row"]}
                        gap={["24px", "24px", "24px"]}

                    >
                        <GridItem
                            colSpan={12}
                            flexDirection="column"
                            color="neutral.50"
                            overflow="auto"
                            className="scroll-hover"
                            maxHeight={["50vh", "50vh", "80vh"]}
                            px={2}
                        >
                            <ModalHeader
                                padding={0}
                                color={modalHeaderColor}
                                fontSize="28px"
                                fontWeight="700"
                                lineHeight="34px"
                            >
                                {klapExportedClip.name}
                            </ModalHeader>

                            <Text mt={5} whiteSpace="break-spaces">
                                {klapExportedClip.name}
                            </Text>


                        </GridItem>
                        <GridItem
                            colSpan={6}
                            overflow="auto"
                            className="scroll-hover"
                            maxHeight={["40vh", "40vh", "80vh"]}
                        >
                            <Flex alignItems="center" gap={4}>
                                <Text
                                    color={modalHeaderColor}
                                    fontWeight="500"
                                    casing="capitalize"
                                >
                                    {klapExportedClip.name}
                                </Text>
                            </Flex>
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter justifyContent="center" gap={6}>
                    <Button
                        fontWeight="500"
                        color="neutral.10"
                        bg="primary.50"
                        _hover={{}}
                        minWidth="144px"
                        onClick={() => copyToClipboard(klapExportedClip.name)}
                    >
                        Copy
                    </Button>
                    <Button onClick={onClose} fontWeight="500" minWidth="144px">
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreatedVideoModal;
