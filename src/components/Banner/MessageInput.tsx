import { Box, Button, Flex, Grid, GridItem, Spinner, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import React, { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { NewQueryMutationType } from "src/types/panel";
import styled from "styled-components";
import { useNewQueryMutation } from "../../api/mutations/conversationIndex";
import { IThreadMessage, Message, Role } from "../../utils/types";
import { AxiosError } from "axios";
import { getToken } from "src/api/queries";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetAgentThread,
  useGetRunStatus,
} from "src/api/queries/knowleeAgentQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useNewUserAgentThreadMutation, useSendMessageInAgentThreadMutation } from "src/api/mutations/agentThreads";
import ThreadMessageChatInput from "../Chat/AgentChat/ThreadMessageChatInput";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";
import { useUserScrapedData } from "src/api/queries";

const serverURL = import.meta.env.VITE_APP_SERVER_URL as string;

interface Props {
  agentId?: string;
  agentName: string;
}

export const Header = styled.div`
  text-align: center;
  font-size: 64px;
  font-family: editor;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

function MessageInput({ agentId, agentName }: Props) {
  const navigate = useNavigate()

  const toast = useToast();
  const queryClient = useQueryClient();
  const assistantName = agentName || 'Knowlee';
  const { threadId } = useParams();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { data: userUsageStat } = useUserUsageStats();
  const newQueryMutation: NewQueryMutationType = useNewQueryMutation(threadId!);

  const {
    isLoading: isLoadingThreadMessages,
    refetch: refetchThreadMessages,
  } = useGetAgentThread(threadId || "");

  const { data: sendMessageData } = useSendMessageInAgentThreadMutation(threadId || "");
  const { data: runningThreadData } = useGetRunStatus(
    sendMessageData?.createdRun.thread_id || "",
    sendMessageData?.createdRun?.id || "",
    threadId,
  );

  const [errorMessage, setErrorMessage] = useState("");
  const { data: userDataSources } = useUserScrapedData();
  const createNewUserAgentThreadMutation = useNewUserAgentThreadMutation();

  const { data: userSubsriptionRes } = useGetUserSubscription();

  const handleSend = async (message: Message) => {
    try {
      // append user entered message
      queryClient.setQueryData(
        ["knowlee-agent", "user-threads-message", threadId],
        (prev?: IThreadMessage[]) => {
          return [
            ...(prev || []),
            {
              id: Date.now().toString(),
              object: "thread.message",
              created_at: Date.now(),
              assistant_id: agentId!,
              thread_id: threadId!,
              run_id: Date.now().toString(),
              role: "user" as Role,
              content: [
                {
                  type: "text",
                  text: {
                    value: message.content ?? "",
                    annotations: [],
                  },
                },
              ],
              file_ids: [],
              metadata: {},
            },
          ];
        }
      );
      setStreamIsLoading(true);

      if (!userDataSources || !userDataSources?.entityList?.length)
        return toast({
          title: "Oops! It seems like you haven't added a knowledge source yet.",
          description: "Let's add one to chat with Knowlee!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });

      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      let userThreadId = threadId;
      if (!threadId) {
        const createdThread =
          await createNewUserAgentThreadMutation.mutateAsync({
            title: `Chatting with ${assistantName}`,
            assistantId: agentId!,
          });
        userThreadId = createdThread?._id;
        if (createdThread) {
          navigate(`/knowleechats/${createdThread._id}`);
        }
      }

      const response = await fetch(
        `${serverURL}api/knowlee-agent/threads/${userThreadId!}/runs/stream`,
        {
          method: "POST",
          body: JSON.stringify({
            textMessage: message.content,
            assistantId: agentId,
            title: `Chatting with ${assistantName}`,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStreamIsLoading(false);
      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;
      let responseTextMessage = "";
      const newMessageDummyId = Date.now().toString();

      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          // refetch all thread messages
          refetchThreadMessages();
          // to update chat tokens count
          queryClient.invalidateQueries([
            "knowlee-agent",
            "user-threads",
            threadId,
            "runs",
          ]);
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });
        responseTextMessage = responseTextMessage.concat(decodedChunk);
        // console.log("decodedChunk------>", decodedChunk);
        // append assistant message to react query store
        queryClient.setQueryData(
          ["knowlee-agent", "user-threads-message", threadId],
          (prev?: IThreadMessage[]) => {
            if (!prev || !prev.length) {
              return [];
            }
            let isMessageUpdated = false;
            const updatedMessages = prev?.map((message) => {
              if (message?.id === newMessageDummyId) {
                isMessageUpdated = true;
                return ({
                  ...message,
                  content: [
                    {
                      type: "text",
                      text: {
                        value: responseTextMessage,
                        annotations: [],
                      },
                    },
                  ],
                });
              }
              return message;
            });
            if (isMessageUpdated) {
              return updatedMessages;
            }
            return [
              ...(prev || []),
              {
                id: newMessageDummyId,
                object: "thread.message",
                created_at: Date.now(),
                run_id: newMessageDummyId,
                assistant_id: agentId!,
                thread_id: threadId!,
                role: "assistant" as Role,
                content: [
                  {
                    type: "text",
                    text: {
                      value: responseTextMessage,
                      annotations: [],
                    },
                  },
                ],
                file_ids: [],
                metadata: {},
              },
            ];
          }
        );
      }
    } catch (error) {
      console.log("error----->", error);
    }
  };

  useEffect(() => {
    if (userUsageStat && userSubsriptionRes) {
      const { tokenUsed = 0, totalRunTokenUsed = 0 } = userUsageStat;
      const { plan } = userSubsriptionRes.userSubscription;
      if (typeof plan === "string") return;
      if ((tokenUsed + totalRunTokenUsed) >= plan.features.maxTokens) {
        setErrorMessage(
          "You have exhausted your credits. Please contact hello@knowlee.ai to request a reset."
        );
        return;
      }
    }
    if (newQueryMutation.isError) {
      const err =
        (newQueryMutation.error as AxiosError<{ message: string }>)?.response
          ?.data?.message || "something went wrong";
      setErrorMessage(err);
    }
    return () => {
      setErrorMessage("");
    };
  }, [newQueryMutation.error, newQueryMutation.isError, userSubsriptionRes, userUsageStat]);

  useEffect(() => {
    const finishedStatuses = ["cancelled", "failed", "completed", "expired"];
    if (finishedStatuses.includes(runningThreadData?.status || "")) {
      refetchThreadMessages();
    }
  }, [refetchThreadMessages, runningThreadData?.status]);


  if (threadId && isLoadingThreadMessages) {
    return (
      <Box position={"absolute"} // Use absolute positioning
        top={0}
        left={0}
        width={"100%"} // Cover the full width
        height={"100%"} // Cover the full height
        display={"flex"} // Add flex display
        justifyContent={"center"} // Center content horizontally
        alignItems={"center"} // Center content vertically
        color="primary.40"
      >
        <Spinner speed="0.8s" color="primary.50" />
      </Box>
    );
  }

  return (
        <ThreadMessageChatInput
            onSend={() => handleSend}
            startRecordingButtonId={""}
            stopRecordingButtonId={""}
            startRecording={() => void 0}
            stopRecording={() => void 0}
            setIsRecording={() => void 0}
            setSpeechToSpeechToggleToggle={() => void 0}
            speechToSpeechToggle={false}
            disabled={
                newQueryMutation.isError || Boolean(errorMessage)
            }
            errorMessage={errorMessage}
        />
  
  );
}

export default MessageInput;
