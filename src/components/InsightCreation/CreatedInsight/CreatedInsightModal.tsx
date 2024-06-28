import {
    Modal,
    ModalOverlay,
    ModalContent,
    useColorModeValue,
    Button,
    ModalFooter,
    ModalHeader,
    Grid,
    ModalBody,
    GridItem,
    // FlexProps,
    Box,
    useToast,
} from "@chakra-ui/react";
import {  ArtemisInsight } from "src/types/insightCreation.interface";
import MarkdownComponent from "src/components/common/Markdown/MarkdownComponent";
// import ImproveCreatedInsightSection from "./ImproveCreatedInsightSection";
// import { useImproveCreatedInsightMutation } from "src/api/mutations/insightIndex";

interface CreatedInsightModalProps {
    insight: ArtemisInsight;
    isOpen: boolean;
    onClose: () => void;
}

// function IconWrapper(flexProps: FlexProps) {
//     return (
//         <Flex
//             boxSize="60px"
//             minW="60px"
//             borderRadius="10px"
//             alignItems="center"
//             justifyInsight="center"
//             flexShrink={0}
//             {...flexProps}
//     />
//     );
// }

// function CreatedInsightIconModal({
//     insightFormat,
// }: {
//         insightFormat: InsightFormat;
// }) {
//     switch (insightFormat) {
//         case "bitcoin":
//             return (
//                 <IconWrapper bgColor="icons.medium">
//                     <MediumIcon width="34" height="34" />
//                 </IconWrapper>
//             );

//         case "ethereum":
//             return (
//                 <IconWrapper bgColor="icons.email">
//                     <EmailIcon width="34" height="34" />
//                 </IconWrapper>
//             );

//         case "perpetuals":
//             return (
//                 <IconWrapper bgColor="icons.facebook">
//                     <FacebookIcon width="34" height="34" />
//                 </IconWrapper>
//             );

//         case "lending":
//             return (
//                 <IconWrapper bgColor="icons.twitter">
//                     <TwitterIcon width="34" height="34" />
//                 </IconWrapper>
//             );
    

//         case "zkrollup":
//             return (
//                 <IconWrapper bgColor="icons.twitter">
//                     <TwitterIcon width="34" height="34" />
//                 </IconWrapper>
//             );
            
//         case "interop":
//             return (
//                 <IconWrapper bgColor="icons.twitter">
//                     <TwitterIcon width="34" height="34" />
//                 </IconWrapper>
//             );

//         case "toplayer1":
//             return (
//                 <IconWrapper bgColor="icons.twitter">
//                     <TwitterIcon width="34" height="34" />
//                 </IconWrapper>
//             );

//         case "majorlayer1":
//             return (
//                 <IconWrapper bgColor="icons.twitter">
//                     <TwitterIcon width="34" height="34" />
//                 </IconWrapper>
//             );
                        
//         case "minorlayer1":
//             return (
//                 <IconWrapper bgColor="icons.twitter">
//                     <TwitterIcon width="34" height="34" />
//                 </IconWrapper>
//             );
                
//         case "layer2":
//             return (
//                 <IconWrapper bgColor="icons.twitter">
//                     <TwitterIcon width="34" height="34" />
//                 </IconWrapper>
//             );
            
//         case "stablecoin":
//             return (
//                 <IconWrapper bgColor="icons.twitter">
//                     <TwitterIcon width="34" height="34" />
//                 </IconWrapper>
//             );
    
//         default:
//             return null;
//     }
// }

function CreatedInsightModal({
    insight,
    isOpen,
    onClose,
}: CreatedInsightModalProps) {

    const toast = useToast();
    const modalContnetBgColor = useColorModeValue("white", "neutral.100");
    const modalHeaderColor = useColorModeValue("neutral.90", "neutral.10");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    // const { mutateAsync, isLoading, variables } = useImproveCreatedInsightMutation();

    // async function handleImproveInsight(action: string) {
    //     await mutateAsync({
    //         action: action,
    //         createdInsightId: insight._id,
    //     });
    // }

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
                            // colSpan={12}
                            colSpan={18}
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
                                {/* {insight.insightTitle} */}
                                {insight.artemisId} - {insight.metric}
                            </ModalHeader>

                            {/* without markdown */}
                            {/* <Text mt={5} whiteSpace="break-spaces">
                                {insight.insightData}
                            </Text> */}

                            {/* using dangerouslySetInnerHTML */}
                            {/* <Box
                                mt={5}
                                whiteSpace="break-spaces"
                                dangerouslySetInnerHTML={{ __html: insight.insightData }}
                            /> */}

                            {/* using react-markdown */}
                            <Box mt={5}>
                                <MarkdownComponent>
                                    {insight.insight}
                                </MarkdownComponent>
                            </Box>
                            {/* <Text mt={5}>
                                Lorem ipsum dolor sit amet consectetur. Odio sem elementum
                                viverra varius etiam porta facilisi egestas proin. Egestas diam
                                fusce tincidunt justo odio ornare pulvinar id vel. Vel euismod
                                dui egestas volutpat et hac. Tellus tellus.
                            </Text>
                            <Text mt="30px">
                                Lorem ipsum dolor sit amet consectetur. Odio sem elementum
                                viverra varius etiam porta facilisi egestas proin. Egestas diam
                                fusce tincidunt justo odio ornare pulvinar id vel. Vel euismod
                                dui egestas volutpat et hac. Tellus tellus.
                            </Text>

                            <Flex flexDirection="column" mt="44px">
                                <Text fontSize="20px" lineHeight="28px">
                                    Pricing Plans for every budget
                                </Text>
                                <Text mt="10px">
                                    Lorem ipsum dolor sit amet consectetur. Odio sem elementum
                                    viverra varius etiam porta facilisi egestas proin. Egestas
                                    diam fusce tincidunt justo odio ornare pulvinar id vel. Vel
                                    euismod dui egestas volutpat et hac. Tellus tellus.
                                </Text>
                                <Text mt="38px">
                                    Lorem ipsum dolor sit amet consectetur. Odio sem elementum
                                    viverra varius etiam porta facilisi egestas proin. Egestas
                                    diam fusce tincidunt justo odio ornare pulvinar id vel. Vel
                                    euismod dui egestas volutpat et hac. Tellus tellus.
                                </Text>
                            </Flex> */}
                        </GridItem>
                        <GridItem
                            colSpan={6}
                            overflow="auto"
                            className="scroll-hover"
                            maxHeight={["40vh", "40vh", "80vh"]}
                        >
                            {/* <Flex alignItems="center" gap={4}>
                                <CreatedInsightIconModal
                                    insightFormat={insight.insightFormat}
                                />
                                <Text
                                    color={modalHeaderColor}
                                    fontWeight="500"
                                    casing="capitalize"
                                >
                                    {insight.insightFormat}
                                </Text>
                            </Flex> */}
                            {/*
                            <ImproveCreatedInsightSection
                                loadingAction={variables?.action}
                                isLoading={isLoading}
                                handleImproveInsight={handleImproveInsight}
                            />
                            */}
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
                        onClick={() => copyToClipboard(insight.insight)}
                        // isDisabled={isLoading}
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

export default CreatedInsightModal;
