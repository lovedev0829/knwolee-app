import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react'
import ConversationTitle from './ConversationTitle'
import DeleteConfirmation from '../Modal/DeleteConfirmationModal'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDeleteConversationMutation } from '../../api/mutations/conversationIndex'
import { useGetConversationList } from '../../api/queries/conversationHooks'
import { PanelOptionType } from 'src/types/panel'
import {
    differenceInDays,
    format,
    isToday,
    isYesterday,
    parseISO,
} from "date-fns";

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

const initialDeleteDialogState: { isOpen: boolean, conversationId?: string } = { isOpen: false }

interface Props {
    onCloseChatHistoryDrawer?: () => void;
}

function Conversations({ onCloseChatHistoryDrawer }: Props) {
    const navigate = useNavigate()
    const now = new Date();
    let previousTimeline = "";
    const [deleteDialogState, setDeleteDialogState] = useState(initialDeleteDialogState);

    const deleteConversationMutation = useDeleteConversationMutation({
        onSuccess: () => {
            navigate("/knowleechats", { replace: true })
        }
    })

    const handleDelete = () => {
        deleteConversationMutation.mutate(deleteDialogState.conversationId!);
        setDeleteDialogState(initialDeleteDialogState);
    };

    const { isLoading, data: conversationList } = useGetConversationList()

    if (isLoading) {
        return (
            <Stack p={3} gap={1}>
                <Skeleton height='32px' rounded="md" />
                <Skeleton height='32px' rounded="md" />
                <Skeleton height='32px' rounded="md" />
            </Stack>
        )
    }

    //console.log("conversationList----->", conversationList)

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
                height={["calc(100vh - 190px)", "calc(100vh - 190px)", "calc(100% - 88px)"]}
            >
                {conversationList && conversationList.map((conversation) => {
                    return (
                        <Fragment key={conversation?._id}>
                            {renderTimeline(conversation.createdAt)}
                            <ConversationTitle
                                key={conversation._id}
                                conversation={conversation}
                                setDeleteDialogState={setDeleteDialogState}
                                onCloseChatHistoryDrawer={onCloseChatHistoryDrawer}
                            />
                        </Fragment>
                    )
                })}
            </Flex>
            <DeleteConfirmation
                isOpen={deleteDialogState.isOpen}
                onClose={() => setDeleteDialogState(initialDeleteDialogState)}
                onDelete={handleDelete}
                title='Delete conversation?'
                text='Conversation will be deleted'
            />
        </>
    )
}

export default Conversations