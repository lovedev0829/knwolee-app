import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EntityWithoutUserVectors } from "src/utils/types";

interface Props {
    entity: EntityWithoutUserVectors;
    handleSelectYouTubeVideo: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
}

function YouTubeVideoItem({
    entity,
    handleSelectYouTubeVideo,
    isLoading = false,
    isDisabled = false,
}: Props) {
    const borderColor = useColorModeValue("neutral.20", "#343839");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const backgroundColor = useColorModeValue("neutral.10", undefined);

    return (
        <Flex
            borderRadius="10px"
            border="1px solid"
            borderColor={borderColor}
            px={5}
            py={2.5}
            alignItems="center"
            justifyContent="space-between"
            background={backgroundColor}
        >
            <Link to={entity.value} target="_blank">
                <Text color={textColor} textDecoration="underline">
                    {entity.value}
                </Text>
            </Link>
            <Button
                bg="primary.50"
                _hover={{}}
                color="neutral.10"
                borderRadius={"12px"}
                p={2}
                onClick={handleSelectYouTubeVideo}
                isLoading={isLoading}
                isDisabled={isDisabled}
            >
                <ArrowForwardIcon fontSize={"md"} boxSize={"6"} />
            </Button>
        </Flex>
    );
}
export default YouTubeVideoItem;
