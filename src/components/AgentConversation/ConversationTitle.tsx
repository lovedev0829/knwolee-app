import { useState } from "react"
import { Box, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import MessageIcon from "src/Icons/MessageIcon"
import PencilIcon from "src/Icons/PencilIcon"
import TrashIcon from "src/Icons/TrashIcon"
import { useUpdateAgentThreadMutation } from "src/api/mutations/agentThreads"
import { UserThread } from "src/types/userAgent.interface"

interface ConversationTitleProps {
    userThread: UserThread,
    onDelete: (threadId: string) => void;
    onCloseChatHistoryDrawer?: () => void;
}

const ConversationTitle = ({ userThread, onDelete, onCloseChatHistoryDrawer }: ConversationTitleProps) => {
    const hoverBackgroundColor = useColorModeValue("gray.100", undefined);
    const activeBackgroundColor = useColorModeValue("neutral.20", "neutral.80");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const iconFillColor = useColorModeValue("#0C0D0D", "#FEFEFE");
    const actionIconFillColor = useColorModeValue("#6C7275", "#B0B3B5");

    const navigate = useNavigate();
    const params = useParams();
    const isActive = params.threadId === userThread._id;
    const [isEditing, setIsEditing] = useState(false);

    const updateThreadMutation = useUpdateAgentThreadMutation(params.threadId!)

    const handleConversationTitleUpdate = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
        await updateThreadMutation.mutateAsync({ title: e.target.value });
        setIsEditing(false)
    }

    if (isEditing) {
        return <Flex mx={1}>
            <Input
                px={2}
                defaultValue={userThread.title}
                onBlur={handleConversationTitleUpdate}
                autoFocus
            />
        </Flex>
    }

    return (
        <Flex
            gap={1}
            alignItems={"center"}
            justifyContent={"space-between"}
            cursor="pointer"
            _hover={{
                cursor: "pointer",
                backgroundColor: hoverBackgroundColor,
            }}
            px={2}
            py={1}
            rounded={"md"}
            onClick={() => {
                onCloseChatHistoryDrawer && onCloseChatHistoryDrawer();
                if (!isActive) {
                    // navigate(`/knowlee-agents/agent-chat/${userThread._id}`);
                    navigate(`/knowleechats/${userThread._id}`);
                } 
            }}
            backgroundColor={isActive ? activeBackgroundColor : "unset"}
        >

            <Flex alignItems={"center"} gap={1} maxW={"80%"}>
                <Box >
                    <MessageIcon
                        width={20}
                        height={20}
                        fill={iconFillColor}
                    />

                </Box>
                <Box maxW={"90%"}>
                    <Text noOfLines={1} color={textColor}>
                        {userThread.title}
                    </Text>
                </Box>
            </Flex>

            <Flex
                alignItems={"center"}
                gap={1}
                // display={["none", "none", isActive ? "flex" : "none"]}
                display={ isActive ? "flex" : "none"}
            >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(true)
                        }}
                    >
                        <PencilIcon
                        fill={actionIconFillColor}
                        />
                    </button>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(userThread._id);
                    }}
                    >
                        <TrashIcon
                            width={20}
                            height={20}
                        fill={actionIconFillColor}
                        />
                    </button>

            </Flex>
        </Flex>
    )
}

export default ConversationTitle