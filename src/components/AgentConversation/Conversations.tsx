import { Box, Flex, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import ConversationTitle from './ConversationTitle'
import DeleteConfirmation from '../Modal/DeleteConfirmationModal'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router'
import { PanelOptionType } from 'src/types/panel'
import {
    differenceInDays,
    format,
    isToday,
    isYesterday,
    parseISO,
} from "date-fns";
import { useGetUserAgentThreadsList } from 'src/api/queries/knowleeAgentQuery'
import { useDeleteAgentThreadMutation } from 'src/api/mutations/agentThreads'
export type QueryQuestion = {
    _id: string
    question: string
    answer: string
    type?: PanelOptionType
    data?: unknown
}

export type Conversation = {
    _id: string;
    title: string;
    chatList: string[] | QueryQuestion[];
    createdAt: string;
    updatedAt: string;
};

interface Props {
    onCloseChatHistoryDrawer?: () => void;
}

function Conversations({ onCloseChatHistoryDrawer }: Props) {
    const navigate = useNavigate()
    const now = new Date();
    let previousTimeline = "";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [threadIdToBeDeleted, setThreadIdToBeDeleted] = useState<string>();

    const deleteConversationMutation = useDeleteAgentThreadMutation({
        onSuccess: () => {
            // navigate("/knowlee-agents/agent-chat", { replace: true });
            navigate("/knowleechats", { replace: true });
        }
    })

    const handleDelete = () => {
        onClose();
        if (!threadIdToBeDeleted) return;
        deleteConversationMutation.mutateAsync(threadIdToBeDeleted);
        setThreadIdToBeDeleted(undefined);
    };

    function openconfirmationDialog(threadId: string) {
        onOpen();
        setThreadIdToBeDeleted(threadId);
    }

    const { isLoading, data: userThreadList } = useGetUserAgentThreadsList()

    if (isLoading) {
        return (
            <Stack p={3} gap={1}>
                <Skeleton height='32px' rounded="md" />
                <Skeleton height='32px' rounded="md" />
                <Skeleton height='32px' rounded="md" />
            </Stack>
        )
    }

    function renderTimeline(timestamp: string) {
        const date = parseISO(timestamp);
        let currentTimeline;
        if (isToday(date)) {
            currentTimeline = "Today";
        } else if (isYesterday(date)) {
            currentTimeline = "Yesterday";
        } else if (differenceInDays(now, date) <= 7) {
            currentTimeline = "Previous 7 days";
        } else if (differenceInDays(now, date) <= 30) {
            currentTimeline = "Previous 30 days";
        } else {
            currentTimeline = format(date, "MMMM yyyy");
        }

        // return null if timeline is same as previous
        if (previousTimeline === currentTimeline) {
            return null;
        }

        // updated previousTimeline ref value
        previousTimeline = currentTimeline;

        return (
            <Box
                color="neutral.50"
                fontSize="13px"
                key={timestamp}
                marginTop="12px"
            >
                {currentTimeline}
            </Box>
        );
    }

    return (
        <>
            <Flex
                className="scroll-hover"
                p={2}
                flexDirection={"column"}
                gap={1}
                overflow={'auto'}
                height={["calc(100% - 148px)", "calc(100% - 148px)", "calc(100% - 176px)"]}
                // height={["calc(100vh - 394px)", "calc(100vh - 394px)", "calc(100vh - 454px)"]}
            >
                {userThreadList && userThreadList.map((userThread) => {
                    return (
                        <Fragment key={userThread?._id}>
                            {renderTimeline(userThread.createdAt)}
                            <ConversationTitle
                                key={userThread._id}
                                userThread={userThread}
                                onDelete={openconfirmationDialog}
                                onCloseChatHistoryDrawer={onCloseChatHistoryDrawer}
                            />
                        </Fragment>
                    )
                })}
            </Flex>
            <DeleteConfirmation
                isOpen={isOpen}
                onClose={onClose}
                onDelete={handleDelete}
                title='Delete Thread?'
                text='Thread will be deleted'
            />
        </>
    )
}

export default Conversations