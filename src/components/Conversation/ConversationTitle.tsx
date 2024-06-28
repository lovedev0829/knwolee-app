import { Box, Flex, Input, Text, useColorMode } from "@chakra-ui/react"
import { Conversation } from "./Conversations"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useUpdateConversationMutation } from "src/api/mutations/conversationIndex"
import MessageIcon from "src/Icons/MessageIcon"
import PencilIcon from "src/Icons/PencilIcon"
import TrashIcon from "src/Icons/TrashIcon"

interface ConversationTitleProps {
    conversation: Conversation,
    setDeleteDialogState: React.Dispatch<React.SetStateAction<{ isOpen: boolean; conversationId?: string }>>
    onCloseChatHistoryDrawer?: () => void;
}

const ConversationTitle = ({ conversation, setDeleteDialogState, onCloseChatHistoryDrawer }: ConversationTitleProps) => {
    const { colorMode } = useColorMode();
    const navigate = useNavigate();
    const params = useParams();
    const isActive = params.conversationId === conversation._id;
    const [isEditing, setIsEditing] = useState(false);

    const updateConversationMutation = useUpdateConversationMutation(params.conversationId!)

    const handleConversationTitleUpdate = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
        //console.log(e.target.value)
        const deletedConversation = await updateConversationMutation.mutateAsync({ title: e.target.value });
        //console.log("deletedConversation----->", deletedConversation);
        setIsEditing(false)
    }

    if (isEditing) {
        return <Flex mx={1}>
            <Input
                px={2}
                defaultValue={conversation.title}
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
            _hover={{
                cursor: "pointer",
                backgroundColor: colorMode === "dark" ? undefined : "gray.100"
            }}
            px={2}
            py={1}
            rounded={"md"}
            onClick={() => {
                onCloseChatHistoryDrawer && onCloseChatHistoryDrawer();
                if (!isActive) navigate(`/knowleechats/${conversation._id}`)
            }}
            backgroundColor={colorMode === "dark"
                ? (isActive ? "neutral.80" : "unset")
                : (isActive ? "neutral.20" : "unset")
            }
        >

            <Flex alignItems={"center"} gap={1} maxW={"80%"}>
                <Box >
                    <MessageIcon
                        width={20}
                        height={20}
                        fill={colorMode === "dark" ? "#FEFEFE" : "#0C0D0D"}
                    />

                </Box>
                <Box maxW={"90%"}>
                    <Text noOfLines={1} color={colorMode === "dark" ? "neutral.10" : "neutral.100"}>
                        {conversation.title}
                    </Text>
                </Box>
            </Flex>

            <Flex alignItems={"center"} gap={1} display={["none", "none", isActive ? "flex" : "none"]}>
                    <button
                        onClick={() => {
                            setIsEditing(true)
                        }}
                    >
                        <PencilIcon
                            fill={colorMode === "dark" ? "#B0B3B5" : "#6C7275"}
                        />
                    </button>
                    <button
                        onClick={() => setDeleteDialogState({ isOpen: true, conversationId: conversation._id, })}
                    >
                        <TrashIcon
                            width={20}
                            height={20}
                            fill={colorMode === "dark" ? "#B0B3B5" : "#6C7275"}
                        />
                    </button>

            </Flex>
        </Flex>
    )
}

export default ConversationTitle