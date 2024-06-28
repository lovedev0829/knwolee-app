import { Box, Button, Flex } from "@chakra-ui/react";
import Conversations from "../Conversation/Conversations";
import PlusIcon from "src/Icons/PlusIcon";

interface Props {
    handleNewChat: () => void;
    onCloseChatHistoryDrawer?: () => void;
    height?: string | number;
}

function ChatHistoryPanel({ handleNewChat, onCloseChatHistoryDrawer, height }: Props) {
    return (
        <Box height={height || "calc(100% - 72px)"} width={["full", "full", "auto"]}>
            <Conversations onCloseChatHistoryDrawer={onCloseChatHistoryDrawer} />
            <Flex px={4} py={6}>
                <Button
                    leftIcon={<PlusIcon />}
                    bg={"primary.50"}
                    color={"neutral.10"}
                    _hover={{}}
                    width={"full"}
                    onClick={handleNewChat}
                >
                    New chat
                </Button>
            </Flex>
        </Box>
    );
}

export default ChatHistoryPanel;
