import {
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import MediaIcon from "src/Icons/MediaIcon";
import { KlapExportedClip } from "src/types/klap.interface";
import EnlargeVideoModal from "src/components/Modal/EnlargeVideoModal";

interface Props {
    klapExportedClip: KlapExportedClip;
}

function ExportedClipItemRow({ klapExportedClip }: Props) {
    const outlineColor = useColorModeValue("neutral.20", "#343839");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const {
        isOpen: isOpenVideoModal,
        onClose: onCloseVideoModal,
        onOpen: openVideoModal,
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
                <Td width={["50px", "50px", "auto"]} px={["16px", "16px", "24px"]}>
                    <Flex alignItems="center">
                        <Text casing="capitalize" display={["none", "none", "block"]}>
                            {klapExportedClip?.klapVideoClip?.virality_score || 0}
                        </Text>
                    </Flex>
                </Td>
                <Td px={["16px", "16px", "24px"]}>
                    <Text
                        // textDecoration="underline"
                        color={textColor}
                        isTruncated={true}
                        maxWidth={["150px", "200px", "100px", "500px"]}
                    >
                        {klapExportedClip.name}
                    </Text>
                </Td>
                <Td px={["16px", "16px", "24px"]}>
                    <Flex justifyContent="center">
                        <Text whiteSpace="nowrap">
                            {formatDistanceToNow(new Date(klapExportedClip.created_at), {
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
                        onClick={openVideoModal}
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
            <EnlargeVideoModal
                isOpen={isOpenVideoModal}
                onClose={onCloseVideoModal}
                src={klapExportedClip.src_url}
            />
        </>
    );
}
export default ExportedClipItemRow;
