import {
    Button,
    Flex,
    // FlexProps,
    Grid,
    GridItem,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import MediaIcon from "src/Icons/MediaIcon";
import { ArtemisInsight } from "src/types/insightCreation.interface";
import CreatedInsightModal from "./CreatedInsightModal";
// import MediumIcon from "src/components/Dashboard/Icons/MediumIcon";
// import EmailIcon from "src/components/Dashboard/Icons/EmailIcon";
// import FacebookIcon from "src/components/Dashboard/Icons/FacebookIcon";
// import TwitterIcon from "src/components/Dashboard/Icons/TwitterIcon";

// function IconWrapper(flexProps: FlexProps) {
//     return (
//         <Flex
//             alignItems="center"
//             borderRadius="full"
//             flexShrink={0}
//             height={8}
//             justifyInsight="center"
//             marginRight="10px"
//             minW={8}
//             width={8}
//             {...flexProps}
//         />
//     );
// }

// function CreatedInsightIconModal({
//     insightFormat,
// }: {
//     insightFormat: InsightFormat;
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

interface Props {
    insight: ArtemisInsight;
}

function TopicItem({ insight }: Props) {
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
                    {/* <Flex alignItems="center">
                        <CreatedInsightIconModal insightFormat={insight.insightFormat} />
                        <Text casing="capitalize" display={["none", "none", "block"]}>{insight.insightFormat}</Text>
                    </Flex> */}
                </GridItem>
                <GridItem colSpan={11}>
                    <Text textDecoration="underline" color={textColor} isTruncated={true}>
                        {insight.insight}
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Flex justifyContent="center">
                        <Text whiteSpace="nowrap">
                            {formatDistanceToNow(new Date(insight.createdAt), {
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
            <CreatedInsightModal
                isOpen={isOpenCCModal}
                onClose={onCloseCCModal}
                insight={insight}
            />
        </>
    );
}
export default TopicItem;
