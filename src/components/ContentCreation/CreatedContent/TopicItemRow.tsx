import { ChangeEvent, useState } from "react";
import {
    Button,
    Flex,
    FlexProps,
    Td,
    Text,
    Tr,
    Input,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import MediaIcon from "src/Icons/MediaIcon";
import { ContentFormat, IContent } from "src/types/contentCreation.interface";
import CreatedContentModal from "./CreatedContentModal";
import MediumIcon from "src/components/Dashboard/Icons/MediumIcon";
import EmailIcon from "src/components/Dashboard/Icons/EmailIcon";
import FacebookIcon from "src/components/Dashboard/Icons/FacebookIcon";
import TwitterIcon from "src/components/Dashboard/Icons/TwitterIcon";
import { useScheduleContentMutation } from "src/api/mutations/contentIndex";
import { format } from "date-fns";
import { useTwitterConfig } from "src/api/queries/twitterQuery";

function IconWrapper(flexProps: FlexProps) {
    return (
        <Flex
            alignItems="center"
            borderRadius="full"
            flexShrink={0}
            height={8}
            justifyContent="center"
            marginRight="10px"
            minW={8}
            width={8}
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
                    <MediumIcon width="18" height="18" />
                </IconWrapper>
            );

        case "email":
            return (
                <IconWrapper bgColor="icons.email">
                    <EmailIcon width="18" height="18" />
                </IconWrapper>
            );

        case "post":
            return (
                <IconWrapper bgColor="icons.facebook">
                    <FacebookIcon width="18" height="18" />
                </IconWrapper>
            );

        case "thread":
        case "tweet":
            return (
                <IconWrapper bgColor="icons.twitter">
                    <TwitterIcon width="18" height="18" />
                </IconWrapper>
            );

        default:
            return null;
    }
}
interface Props {
    content: IContent;
}

function TopicItemRow({ content }: Props) {
    const outlineColor = useColorModeValue("neutral.20", "#343839");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const {
        isOpen: isOpenCCModal,
        onClose: onCloseCCModal,
        onOpen: openCCModal,
    } = useDisclosure();
    const toast = useToast();
    const { data: twitterConfig } = useTwitterConfig();

    const [scheduledAt, setscheduledAt] = useState(
        content.scheduledAt
            ? format(new Date(content.scheduledAt), "yyyy-MM-dd'T'HH:mm")
            : ""
    );

    // Function to handle date input changes
    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setscheduledAt(event.target.value);
    };

    const scheduleContentMutation = useScheduleContentMutation();

    // Function to update the MongoDB document
    // This is a placeholder. You'll need to implement the actual API call
    const handleScheduleContent = async () => {
        if (!scheduledAt) {
            toast({
                title: "Validation Failed",
                description: "Please select schedule date",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        const contentToUpdate = {
            id: content._id, // Mapping `_id` to `id`
            scheduledAt: new Date(scheduledAt), // Assuming you want to add the scheduledAt to your content document
        };
        await scheduleContentMutation.mutateAsync(contentToUpdate);
    };

    return (
        <>
            <Tr
                borderRadius="10px"
                border="3px solid transparent"
                outline="1px solid"
                outlineColor={outlineColor}
                px={5}
                py={2.5}
                color={textColor}
            >
                <Td width={["50px", "50px", "auto"]} px={["16px", "16px", "24px"]}>
                    <Flex alignItems="center">
                        <CreatedContentIconModal contentFormat={content.contentFormat} />
                        <Text casing="capitalize" display={["none", "none", "block"]}>
                            {content.contentFormat}
                        </Text>
                    </Flex>
                </Td>
                <Td px={["16px", "16px", "24px"]}>
                    <Text
                        textDecoration="underline"
                        color={textColor}
                        isTruncated={true}
                        maxWidth={["150px", "200px", "100px", "280px"]}
                    >
                        {content.contentData}
                    </Text>
                </Td>
                <Td px={["16px", "16px", "24px"]}>
                    <Input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={handleDateChange}
                        placeholder="YYYY-MM-DDThh:mm"
                        size="sm"
                        disabled={Boolean(
                            content.scheduledAt ||
                            scheduleContentMutation.isLoading ||
                            ((content.contentFormat === "tweet" ||
                                content.contentFormat === "thread") &&
                                !twitterConfig)
                        )}
                    />
                </Td>
                <Td px={["4px", "4px", "6px"]}>
                    <Button
                        onClick={handleScheduleContent}
                        bg="transparent"
                        size="sm"
                        isLoading={scheduleContentMutation.isLoading}
                        isDisabled={Boolean(
                            content.scheduledAt ||
                            scheduleContentMutation.isLoading ||
                            ((content.contentFormat === "tweet" ||
                                content.contentFormat === "thread") &&
                                !twitterConfig)
                        )}
                    >
                        Schedule
                    </Button>
                </Td>
                <Td px={["16px", "16px", "24px"]}>
                    <Button
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                        onClick={openCCModal}
                        bg="transparent"
                        _hover={{}}
                    >
                        <MediaIcon />
                        <Text color="primary.50" fontSize="13px" fontWeight="500">
                            Open
                        </Text>
                    </Button>
                </Td>
            </Tr>
            <Tr height="8px" />
            <CreatedContentModal
                isOpen={isOpenCCModal}
                onClose={onCloseCCModal}
                content={content}
            />
        </>
    );
}
export default TopicItemRow;
