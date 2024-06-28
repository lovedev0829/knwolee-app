import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useGenerateContentMutation } from "src/api/mutations/contentIndex";
import { Topic } from "src/types/contentCreation.interface";

interface Props {
    topic: Topic;
}

function TopicItem({ topic }: Props) {
    const borderColor = useColorModeValue("neutral.20", "#343839");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const backgroundColor = useColorModeValue("neutral.10", undefined);

    const generateContentMutation = useGenerateContentMutation();

    function handleGenerateContentClick() {
        generateContentMutation.mutate({ topic: topic });
    }

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
            <Text color={textColor}>{topic.topicTitle}</Text>
            <Button
                bg="primary.50"
                _hover={{}}
                color="neutral.10"
                borderRadius={"12px"}
                p={2}
                onClick={handleGenerateContentClick}
                isLoading={generateContentMutation.isLoading}
            >
                <ArrowForwardIcon fontSize={"md"} boxSize={"6"} />
            </Button>
        </Flex>
    );
}
export default TopicItem;
