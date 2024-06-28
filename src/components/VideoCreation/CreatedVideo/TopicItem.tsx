import {
    Button,
    Flex,
    FlexProps,
    Grid,
    GridItem,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import MediaIcon from "src/Icons/MediaIcon";
import { ContentFormat, IContent } from "src/types/contentCreation.interface";
import CreatedVideoModal from "./ExportedVideoClipModal";
import MediumIcon from "src/components/Dashboard/Icons/MediumIcon";
import EmailIcon from "src/components/Dashboard/Icons/EmailIcon";
import FacebookIcon from "src/components/Dashboard/Icons/FacebookIcon";
import TwitterIcon from "src/components/Dashboard/Icons/TwitterIcon";

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

function TopicItem({ content }: Props) {
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const borderColor = useColorModeValue("neutral.20", "#343839");
    const backgroundColor = useColorModeValue("neutral.10", undefined);

    const {
        isOpen: isOpenCCModal,
        onClose: onCloseCCModal,
        onOpen: openCCModal,
    } = useDisclosure();

    return (
        <>
            <Grid
                borderRadius="10px"
                border="1px solid"
                borderColor={borderColor}
                px={5}
                py={2.5}
                alignItems="center"
                justifyContent="space-between"
                background={backgroundColor}
                templateColumns="repeat(18, 1fr)"
                gap={2}
                color={textColor}
            >
                <GridItem colSpan={3}>
                    <Flex alignItems="center">
                        <CreatedContentIconModal contentFormat={content.contentFormat} />
                        <Text casing="capitalize" display={["none", "none", "block"]}>{content.contentFormat}</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={11}>
                    <Text textDecoration="underline" color={textColor} isTruncated={true}>
                        {content.contentData}
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Flex justifyContent="center">
                        <Text whiteSpace="nowrap">
                            {formatDistanceToNow(new Date(content.createdAt), {
                                addSuffix: true,
                            })}
                        </Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={2}>
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
                </GridItem>
            </Grid>
            {/*<CreatedVideoModal
                isOpen={isOpenCCModal}
                onClose={onCloseCCModal}
                content={content}
                        />*/}
        </>
    );
}
export default TopicItem;
