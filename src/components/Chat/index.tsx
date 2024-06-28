import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { NewQueryMutationType, PANEL_OPTIONS } from "src/types/panel";
import styled from "styled-components";
import { useNewQueryMutation, useRegenerateResponseMutation } from "../../api/mutations/conversationIndex";
import { useConversationData } from "../../api/queries/conversationHooks";
import { useChatsStore } from "../../store";
import { Message, Role } from "../../utils/types";
import { ChatInput } from "./ChatInput";
import MessageBox from "./MessageBox";
import { AxiosError } from 'axios';
import AIPendingBubble from './AIPendingBubble';
import { RegenerateResponsePayload } from "src/api/requests/queryIndex";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";

interface Props {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
}

export const Header = styled.div`
  text-align: center;
  font-size: 64px;
  font-family: editor;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: `Hello and welcome! I'm Knowlee!`,
  },
];

// This is the main chat component and its functionality is for normal chatbot interaction without panel functionality
export const Chat: FC<Props> = () => {
  const { conversationId } = useParams();
  const { pendingMessageData, clearPendingMessageData } = useChatsStore();
  const regenerateResponseMutation = useRegenerateResponseMutation(conversationId);
  const { data: userUsageStat } = useUserUsageStats();

  const { data: userSubsriptionRes } = useGetUserSubscription();
  const { isLoading: isConversationLoading, data: conversation } =
    useConversationData(conversationId!);
  const newQueryMutation: NewQueryMutationType = useNewQueryMutation(
    conversationId!
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const isOperationOngoingRef = useRef(false);
  const hasOperationSucceededRef = useRef(false);

  const handleSend = async (message: Message) => {
    setIsLoading(true);
    try {
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);

      const response = await newQueryMutation.mutateAsync({
        updatedMessages,
      })

      if (!response) return null

      const content: string = response && response.answer;

      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: content,
        },
      ]);
    } catch (error) {
      //console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleRegenerateResponse(data: RegenerateResponsePayload) {
    setMessages(msgs => {
      return msgs.map(msg => {
        if (msg._id === data.queryQuestionId && msg.role === "assistant") {
          return ({ ...msg, isLoading: true });
        }
        return msg;
      });
    })
    const response = await regenerateResponseMutation.mutateAsync(data);
    setMessages(msgs => {
      return msgs.map(msg => {
        if (msg._id === data.queryQuestionId && msg.role === "assistant") {
          return ({
            ...msg,
            isLoading: false,
            content: response?.answer || data.content,
          });
        }
        return msg;
      });
    })
    return response;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (pendingMessageData) {
      setMessages([
        {
          role: "user",
          content: pendingMessageData.messageToSend,
        },
      ]);
      return
    }
    const hasPreviousMessages = conversation && conversation.chatList.length > 0;
    const updatedMessages = hasPreviousMessages ? [] :  [...initialMessages];
    conversation?.chatList.map((query) => {
      if (typeof query === "string") {
        return;
      }
      const { _id, answer, question, data, type } = query;
      updatedMessages.push({
        role: "user",
        content: question,
        _id: _id,
      });

      switch (type) {
        case PANEL_OPTIONS.AUDIO:
          updatedMessages.push({
            role: "assistant",
            content: `Transcription result`,
            metaData: {
              type: type,
              data: (data as { audioUrl: string }).audioUrl,
            },
            _id: _id,
          });
          break;

        case PANEL_OPTIONS.DOCUMENT:
          updatedMessages.push({
            role: "assistant",
            content: answer,
            _id: _id,
          });
          break;

        case PANEL_OPTIONS.IMAGE:
          updatedMessages.push({
            role: "assistant",
            content: `Here is the result of a photo of ${question}`,
            metaData: {
              type: type,
              data: (data as { imageUrl: string }).imageUrl,
            },
            _id: _id,
          });
          break;

        case PANEL_OPTIONS.IMAGE_INTERPRETER:
          updatedMessages.push({
            role: "assistant",
            content: answer,
            metaData: {
              type: type,
              data: (data as { image_url: string })?.image_url,
            },
            _id: _id,
          });
          break;

        case PANEL_OPTIONS.VIDEO:
          updatedMessages.push({
            role: "assistant",
            content: `video for ${question}`,
            metaData: {
              type: PANEL_OPTIONS.VIDEO,
              data: (data as { videoUrl: string }).videoUrl,
            },
            _id: _id,
          });
          break;

        default:
          updatedMessages.push({
            role: "assistant",
            content: answer,
            _id: _id,
          });
          break;
      }
    });
    setMessages(updatedMessages);
  }, [conversation, pendingMessageData]);

  const isPendingMessage =
    pendingMessageData && pendingMessageData.conversationId === conversationId;

  const resolvePendingMessage = async () => {
    if (
      !isPendingMessage ||
      isOperationOngoingRef.current ||
      hasOperationSucceededRef.current
    ) {
      return;
    }

    isOperationOngoingRef.current = true;

    const messageToSend = {
      role: "user" as Role,
      content: pendingMessageData.messageToSend,
    };
    try {
      await handleSend(messageToSend);
      hasOperationSucceededRef.current = true;
      clearPendingMessageData();
    } catch (error) {
      isOperationOngoingRef.current = false;
      //console.log(error);
    }
  };

  useEffect(() => {
    // This gets called two times
    //console.log("pendingMessageData=====>", pendingMessageData);
    if (pendingMessageData) {
      ////console.log("");
      resolvePendingMessage();
    }
  }, [pendingMessageData]);

  useEffect(() => {
    if (userUsageStat && userSubsriptionRes) {
      const { tokenUsed = 0, totalRunTokenUsed = 0 } = userUsageStat;
      const { plan } = userSubsriptionRes.userSubscription;
      if (typeof plan === "string") return;
      if ((tokenUsed + totalRunTokenUsed) >= plan.features.maxTokens) {
        setErrorMessage("You have exhausted your credits. Please upgrade your plan or purchase additional credits.");
        return;
      }
    }
    if (newQueryMutation.isError) {
      const err = (newQueryMutation.error as AxiosError<{ message: string }>)?.response?.data?.message || "something went wrong"
      setErrorMessage(err)
    }
    return () => {
      setErrorMessage("");
    }
  }, [newQueryMutation.error, newQueryMutation.isError, userSubsriptionRes, userUsageStat])



  if (isConversationLoading) {
    return (
      <Stack mt={2} gap={1}>
        <Skeleton height="32px" />
        <Skeleton height="32px" />
        <Skeleton height="32px" />
      </Stack>
    );
  }

  //console.log("newQueryMutation=====>", newQueryMutation.isLoading);

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent="space-between"
    >
      <Box
        className="scroll-hover"
        width={"100%"}
        h={"100%"}
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
      >
        <Box
          className="scroll-hover"
          height={"420px"}
          overflow={"auto"}
          ref={messagesEndRef}
          flexGrow={1}
        >
          {messages.map((message, index) => {
            if (message.isLoading) return <AIPendingBubble />
            return (<MessageBox
              key={index}
              message={message}
              handleRegenerateResponse={handleRegenerateResponse}
            />)
          })}
          {isLoading && (
            <AIPendingBubble />
          )}
        </Box>
        <Box mt={4}>
          <ChatInput
            onSend={handleSend}
            disabled={newQueryMutation.isError || Boolean(errorMessage)}
            errorMessage={errorMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};
