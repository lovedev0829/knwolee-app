import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useGenerateInsightMutation } from "src/api/mutations/insightIndex";
import { Kpi } from "src/types/insightCreation.interface";

interface Props {
    kpi: Kpi;
}

function TopicItem({ kpi }: Props) {
    const borderColor = useColorModeValue("neutral.20", "#343839");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const backgroundColor = useColorModeValue("neutral.10", undefined);

    const generateInsightMutation = useGenerateInsightMutation();

    function handleGenerateInsightClick() {
        generateInsightMutation.mutate({ kpi: kpi });
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
            <Text color={textColor}>{kpi.kpiTitle}</Text>
            <Button
                bg="primary.50"
                _hover={{}}
                color="neutral.10"
                borderRadius={"12px"}
                p={2}
                onClick={handleGenerateInsightClick}
                isLoading={generateInsightMutation.isLoading}
            >
                <ArrowForwardIcon fontSize={"md"} boxSize={"6"} />
            </Button>
        </Flex>
    );
}
export default TopicItem;
