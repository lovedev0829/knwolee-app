import { Box, Button, Flex, FormControl, Select, useToast } from "@chakra-ui/react";
import Conversations from "../../AgentConversation/Conversations";
import PlusIcon from "src/Icons/PlusIcon";
import { SettingFormLabel } from "src/components/Settings/common";
import { useUserAgents } from "src/api/queries/knowleeAgentQuery";
import { defaultInitialPrompts } from 'src/utils/constants'; 
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";

interface Props {
    agentId: string;
    handleNewChat: () => void;
    onCloseChatHistoryDrawer?: () => void;
    setAgentId: React.Dispatch<React.SetStateAction<string>>;
    setAgentName: React.Dispatch<React.SetStateAction<string>>;
    setInitialPrompts: React.Dispatch<React.SetStateAction<string[]>>;
    isCreatingNewChat?: boolean;
}

function ChatHistoryPanel({
    handleNewChat,
    onCloseChatHistoryDrawer,
    setAgentName,
    setAgentId,
    setInitialPrompts,
    agentId,
    isCreatingNewChat = false
}: Props) {
    const { data: userAgents } = useUserAgents();
    const { data: userUsageStat } = useUserUsageStats();
    const { data: userSubsriptionRes } = useGetUserSubscription();
    const toast = useToast();

    const hasCreditsLeft = () => {
        if (!userUsageStat || !userSubsriptionRes) return false;
        const { tokenUsed = 0, totalRunTokenUsed = 0, credit: { total: creditTotal = 0 } = {} } = userUsageStat;
        const { plan } = userSubsriptionRes.userSubscription;
        if (!plan || typeof plan === "string") return false;
        return (tokenUsed + totalRunTokenUsed - creditTotal) < plan?.features?.maxTokens;
    };

    const handleAgentSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {        
          const agentId = event.target.value;
        const agent = userAgents?.find(agent => agent.assistant.id === agentId);
        //if(!agent) return;
        setAgentId(agentId);
        if (agentId === "asst_TXPtobSTfuurPcgQMn78jAAO" || !agent?.initialPrompts) {
            setInitialPrompts(defaultInitialPrompts); // Make sure to define your default prompts
        } else {
            setInitialPrompts(agent.initialPrompts);
        } setAgentName(agent?.assistant.name || "");
    };

    const handleNewChatClick = () => {
        if (!hasCreditsLeft()) {
            toast({
                title: "No Credits Left",
                description: "Insufficient credits. Upgrade your plan or purchase more.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        handleNewChat();
    };

    return (
        <Box
            height={["full", "full", "calc(100% - 69px)"]}
            width={["full", "full", "auto"]}
        >
            <FormControl px={3} pt={"8px"}>
                <SettingFormLabel>Select Assistant</SettingFormLabel>
                <Select
                    size="md"
                    onChange={handleAgentSelect}
                    value={agentId || "default"}
                >
                    <option value="asst_TXPtobSTfuurPcgQMn78jAAO">
                        Knowlee Assistant
                    </option>
                    {userAgents &&
                        userAgents.map((agent) => {
                            return (
                                <option
                                    key={agent._id}
                                    value={agent.assistant.id}
                                >
                                    {agent.assistant.name}
                                </option>

                            );
                        })}
                </Select>
            </FormControl>
            <Conversations onCloseChatHistoryDrawer={onCloseChatHistoryDrawer} />
            <Flex px={["16px"]} py={["12px", "12px", "24px"]}>
                <Button
                    leftIcon={<PlusIcon />}
                    bg={"primary.50"}
                    color={"neutral.10"}
                    _hover={{}}
                    width={"full"}
                    onClick={handleNewChatClick}
                    isDisabled={isCreatingNewChat}
                    isLoading={isCreatingNewChat}
                >
                    New chat
                </Button>
            </Flex>
        </Box>
    );
}

export default ChatHistoryPanel;
