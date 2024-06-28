import {
    Checkbox,
    Flex,
    Spinner,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useUserAgents } from "src/api/queries/knowleeAgentQuery";

type Props = {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    assistantIds?: string[];
};

function AssistantListInput({ handleChange, assistantIds }: Props) {
    const labelTextColor = useColorModeValue("neutral.60", "neutral.40");
    const { data: userAssistantList, isLoading } = useUserAgents();
    if (isLoading) return <Spinner speed="0.8s" color="primary.50" />;
    if (!userAssistantList || !userAssistantList.length)
        return "No user assistants available";
    return userAssistantList.map((fn) => {
        const { assistant } = fn;
        const { id: assistantId = "", name = "" } = assistant;
        const isChecked = assistantIds?.includes(assistantId);

        return (
            <Flex align="center" gap={"8px"} key={assistantId}>
                <Checkbox
                    name="assistantIds"
                    value={assistantId}
                    isChecked={isChecked}
                    onChange={handleChange}
                />
                <Text
                    fontSize="14px"
                    color={labelTextColor}
                    textTransform={"capitalize"}
                >
                    {name}
                </Text>
            </Flex>
        );
    });
}

export default AssistantListInput;
