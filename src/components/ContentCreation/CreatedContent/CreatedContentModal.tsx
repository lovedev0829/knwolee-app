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
    FlexProps,
    Box,
    useToast,
} from "@chakra-ui/react";
import MediumIcon from "../../Dashboard/Icons/MediumIcon";
import { ContentFormat, IContent } from "src/types/contentCreation.interface";
import EmailIcon from "src/components/Dashboard/Icons/EmailIcon";
import FacebookIcon from "src/components/Dashboard/Icons/FacebookIcon";
import TwitterIcon from "src/components/Dashboard/Icons/TwitterIcon";
import ImproveCreatedContentSection from "./ImproveCreatedContentSection";
import { useImproveCreatedContentMutation } from "src/api/mutations/contentIndex";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import MarkdownComponent from "src/components/common/Markdown/MarkdownComponent";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";

interface CreatedContentModalProps {
    content: IContent;
    isOpen: boolean;
    onClose: () => void;
}

function IconWrapper(flexProps: FlexProps) {
    return (
        <Flex
            boxSize="60px"
            minW="60px"
            borderRadius="10px"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            {...flexProps}
    />
    );
}

function CreatedContentIconModal({
    contentFormat,
}: {
        contentFormat: ContentFormat;
}) {
    switch (contentFormat) {
        case "article":
            return (
                <IconWrapper bgColor="icons.medium">
                    <MediumIcon width="34" height="34" />
                </IconWrapper>
            );

        case "email":
            return (
                <IconWrapper bgColor="icons.email">
                    <EmailIcon width="34" height="34" />
                </IconWrapper>
            );

        case "post":
            return (
                <IconWrapper bgColor="icons.facebook">
                    <FacebookIcon width="34" height="34" />
                </IconWrapper>
            );

        case "thread":
        case "tweet":
            return (
                <IconWrapper bgColor="icons.twitter">
                    <TwitterIcon width="34" height="34" />
                </IconWrapper>
            );

        default:
            return null;
    }
}

function CreatedContentModal({
    content,
    isOpen,
    onClose,
}: CreatedContentModalProps) {

    const toast = useToast();
    const modalContnetBgColor = useColorModeValue("white", "neutral.100");
    const modalHeaderColor = useColorModeValue("neutral.90", "neutral.10");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    const { data: userSubsriptionRes } = useGetUserSubscription();
    const { data: userUsageStat } = useUserUsageStats();
    const { mutateAsync, isLoading, variables } = useImproveCreatedContentMutation();

    async function handleImproveContent(action: string) {
        // check token used
        const maxTokens = userSubsriptionRes?.userSubscription?.plan?.features?.maxTokens || 0;
        if (userUsageStat && maxTokens) {
            if (userUsageStat.tokenUsed >= maxTokens) {
                toast({
                    title: "An error occurred.",
                    description: "Token usage exceeded",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
        }
        await mutateAsync({
            action: action,
            createdContentId: content._id,
        });
    }

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
                                fontSize="20px"
                                fontWeight="700"
                                lineHeight="26px"
                            >
                                {content.contentTitle}
                            </ModalHeader>

                            {/* without markdown */}
                            {/* <Text mt={5} whiteSpace="break-spaces">
                                {content.contentData}
                            </Text> */}

                            {/* using dangerouslySetInnerHTML */}
                            {/* <Box
                                mt={5}
                                whiteSpace="break-spaces"
                                dangerouslySetInnerHTML={{ __html: content.contentData }}
                            /> */}

                            {/* using react-markdown */}
                            <Box mt={5}>
                                <MarkdownComponent>
                                    {content.contentData}
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
                            <Flex alignItems="center" gap={4}>
                                <CreatedContentIconModal
                                    contentFormat={content.contentFormat}
                                />
                                <Text
                                    color={modalHeaderColor}
                                    fontWeight="500"
                                    casing="capitalize"
                                >
                                    {content.contentFormat}
                                </Text>
                            </Flex>
                            <ImproveCreatedContentSection
                                loadingAction={variables?.action}
                                isLoading={isLoading}
                                handleImproveContent={handleImproveContent}
                            />
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
                        onClick={() => copyToClipboard(content.contentData)}
                        isDisabled={isLoading}
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

export default CreatedContentModal;
