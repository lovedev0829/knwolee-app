import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ElementType } from 'react';
import LogIn04AltIcon from "src/Icons/knowlee-agents/LogIn04AltIcon";
import { useUserData } from "src/api/queries";
// import { Assistant } from "src/types/openAI.interface";
import { Assistant } from "openai/resources/beta/index.mjs";
import AssistantActionsMenu from "./MyAgents/AssistantActionsMenu";
import * as AiIcons from 'react-icons/ai';
import { AiFillRobot } from "react-icons/ai";
interface Props {
    avatar: {
        name:string,
        color:string
    };
    assistant: Assistant;
    isCreator?: boolean;
    initialPrompts: string[];
    isDefaultAgentAdded: boolean;
}

function AssistantCard({avatar, assistant, isCreator, initialPrompts, isDefaultAgentAdded }: Props) {
    //console.log("Assistant object:", assistant); // Debugging
    const { description, name, metadata } = assistant;
    const navigate = useNavigate();

    const textColor = useColorModeValue("neutral.90", "neutral.10");
    const borderColor = useColorModeValue("neutral.20", "neutral.05100");
    const buttonBorderColor = useColorModeValue("neutral.30", "neutral.05100");
    const pathFillColor = useColorModeValue("#0C0D0D", "#FEFEFE");
    
    let IconComponent: JSX.Element;
    // If avatar.name is a key of AiIcons, then retrieve it using a type assertion
    if (avatar && avatar.name in AiIcons) {
        const SelectedIcon = AiIcons[avatar.name as keyof typeof AiIcons] as ElementType;
        IconComponent = <SelectedIcon size={40} color={avatar?.color} />;
    } else {
        IconComponent = <AiFillRobot size={40} color={avatar?.color} />;
    }


    const { data: userData } = useUserData();

    function handleRunClick() {
        // navigate(`/knowlee-agents/agent-chat`, { state: { assistantId: assistant.id } });
        navigate(`/knowleechats`, { state: { assistantId: assistant.id, initialPrompts: initialPrompts } });
    }

    function renderActionMenu() {
        //console.log("isDefaultAgentAdded in renderActionMenu:", isDefaultAgentAdded); // Debugging
        if (isCreator) {
            return <AssistantActionsMenu assistantId={assistant.id} isDefaultAgentAdded={isDefaultAgentAdded} />;
        }

        if ((metadata as { creatorId?: string })?.creatorId === userData?.id) {
            return <AssistantActionsMenu assistantId={assistant.id} isDefaultAgentAdded={isDefaultAgentAdded} />;
        }
    }

    return (
        <Box
            display="flex"
            width={["full", "calc(50% - 8px)", "300px", "242px"]}
            padding="20px 24px"
            flexDirection="column"
            justifyContent="center"
            alignItems="flexStart"
            gap="20px"
            borderRadius="12px"
            border="1px solid"
            borderColor={borderColor}
        >
            <Flex alignItems="center" gap="16px" justifyContent="space-between">
                <Box
                    w="60px"
                    h="60px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                >
                    {IconComponent}
                </Box>
                <Button
                    display="flex"
                    padding="12px 24px"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                    border="2px solid"
                    borderColor={buttonBorderColor}
                    color={textColor}
                    leftIcon={<LogIn04AltIcon pathFill={pathFillColor} />}
                    fontSize="16px"
                    fontWeight="500"
                    onClick={handleRunClick}
                >
                    Chat
                </Button>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
                <Box color={textColor}>
                    <Text fontWeight="500" fontSize="16px" lineHeight="24px">
                        {name}
                    </Text>
                    <Text fontWeight="500" fontSize="12px" lineHeight="24px">
                        {description}
                    </Text>
                </Box>

                {/* show only if the user is owner */}
                {renderActionMenu()}

            </Flex>
        </Box>
    );
}

export default AssistantCard;
