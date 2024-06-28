import {
    Button,
    Flex,
    // FlexProps,
    Td,
    Text,
    Tr,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import MediaIcon from "src/Icons/MediaIcon";
import {  ArtemisInsight } from "src/types/insightCreation.interface";
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
//             justifyContent="center"
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

function TopicItemRow({ insight }: Props) {
    const outlineColor = useColorModeValue("neutral.20", "#343839");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const {
        isOpen: isOpenCCModal,
        onClose: onCloseCCModal,
        onOpen: openCCModal,
    } = useDisclosure();

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
                {/* <Td width={["50px", "50px", "auto"]} px={["16px", "16px", "24px"]}>
                    <Flex alignItems="center">
                        <CreatedInsightIconModal insightFormat={insight.insightFormat} />
                        <Text casing="capitalize" display={["none", "none", "block"]}>
                            {insight.insightFormat}
                        </Text>
                    </Flex>
                </Td> */}
                <Td px={["16px", "16px", "24px"]}>
                    <Text
                        textDecoration="underline"
                        color={textColor}
                        isTruncated={true}
                        maxWidth={["150px", "200px", "100px", "500px"]}
                    >
                        {insight.metric} of {insight.artemisId}
                    </Text>
                </Td>
                <Td px={["16px", "16px", "24px"]}>
                    <Flex justifyContent="center">
                        <Text whiteSpace="nowrap">
                            {formatDistanceToNow(new Date(insight.createdAt), {
                                addSuffix: true,
                            })}
                        </Text>
                    </Flex>
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
            <CreatedInsightModal
                isOpen={isOpenCCModal}
                onClose={onCloseCCModal}
                insight={insight}
            />
        </>
    );
}
export default TopicItemRow;
