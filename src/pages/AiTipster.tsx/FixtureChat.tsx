import { Box, Flex, Grid, GridItem, Spinner, Text, useDisclosure,
  Button,
  Tooltip,
  useColorModeValue 
} from "@chakra-ui/react";
import React, { useEffect, useId, useRef, useState } from "react";
import { InfoIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { useNewUserAgentThreadMutation } from "src/api/mutations/agentThreads";
import MobileMenuIcon from "src/Icons/MobileMenuIcon";
import MobileMenuDrawer from "src/components/PageContainer/MobileMenuDrawer";
import { NewQueryMutationType } from "src/types/panel";
import styled from "styled-components";
import { AxiosError } from "axios";
import { getToken } from "src/api/queries";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetAgentThread,
  useGetRunStatus,
} from "src/api/queries/knowleeAgentQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useSendMessageInAgentThreadMutation } from "src/api/mutations/agentThreads";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import { useNewQueryMutation } from "src/api/mutations/conversationIndex";

import AIPendingBubble from "src/components/Chat/AIPendingBubble";
import ThreadMessageChatInput from "src/components/Chat/AgentChat/ThreadMessageChatInput";
import { Message } from "src/utils/types.ts";
import MessageBox from "src/components/Chat/AgentChat/MessageBox";
import { createAudio, getAudio } from "src/utils/audio";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";

// interface Props {
//   setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
//   showSidebar: boolean;
//   agentId?: string;
//   agentName: string;
//   initialPrompts: string[];
// }

interface Props {
  assistantId: string;
  homeName: string;
  awayName: string;
}

export const Header = styled.div`
  text-align: center;
  font-size: 64px;
  font-family: editor;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

export default function FixtureChat({
  assistantId,
  homeName,
  awayName,
}: Props) {
  const borderColor = useColorModeValue("#E8ECEF", "#343839");
  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const borderColor1 = useColorModeValue("neutral.30", "neutral.80");
  const bgColor = useColorModeValue("white", "neutral.90");
  const color = useColorModeValue("blackAlpha.800", "whiteAlpha.900");
  const hoverBorderColor = useColorModeValue("gray.400", "gray.500");
  const hoverTextColor = useColorModeValue("blackAlpha.900", "whiteAlpha.900");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.900");
  const {
    isOpen: isOpenMobileMenu,
    onOpen: onOpenMobileMenu,
    onClose: onCloseMobileMenu,
  } = useDisclosure();
  const {
    isOpen: isOpenChatHistoryDrawer,
    onOpen: onOpenChatHistoryDrawer,
    onClose: onCloseChatHistoryDrawer,
  } = useDisclosure();
  const location = useLocation();

  const [agentId, setAgentId] = useState<string>(assistantId);

  const [initialPrompts, setInitialPrompts] = useState<string[]>(
    (location.state as { initialPrompts: string[] })?.initialPrompts || []
  );

  const [threadId, setThreadId] = useState("");
  const { data: userSubsriptionRes } = useGetUserSubscription();
  const createNewUserAgentThreadMutation = useNewUserAgentThreadMutation();
  const createNewUserAgentThread = async () => {
    try {
      const createdThread = await createNewUserAgentThreadMutation.mutateAsync({
        assistantId: `AI Tipster ${awayName}- ${homeName}`,
      });

      if (createdThread) {
        //console.log(createdThread._id);
        setThreadId(createdThread._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    createNewUserAgentThread();
  }, []);


  const queryClient = useQueryClient();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { data: userUsageStat } = useUserUsageStats();
  const newQueryMutation: NewQueryMutationType = useNewQueryMutation(threadId);

  const { data: threadResponse, isLoading: isLoadingThreadMessages } =
    useGetAgentThread(threadId);
  const { mutateAsync: sendMessageToThread, data: sendMessageData } =
    useSendMessageInAgentThreadMutation(threadId || "");
  const { data: runningThreadData } = useGetRunStatus(
    sendMessageData?.createdRun.thread_id || "",
    sendMessageData?.createdRun?.id || ""
  );

  const [errorMessage, setErrorMessage] = useState("");

    const [isRecording, setIsRecording] = useState(false)
    const [speechToSpeechToggle, setSpeechToSpeechToggleToggle] = useState<boolean>(false); // State for toggle button
    const startRecordingButtonId = useId()
    const stopRecordingButtonId = useId()
    const speechToSpeechAudioElementRef = React.useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false)  
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const handleSend = async (message: Message) => {
      try {
        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);

        const token = await getToken(
          getAccessTokenSilently,
          getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");

        const response = await sendMessageToThread({
          threadId: threadId,
          textMessage: message.content,
          shouldRun: true,
          assistantId: agentId,
          title: `AI Tipster ${awayName}- ${homeName}`,
        });

        if (!response) return null;

        const addedMessage = response.message.content;

        const userThread = response.userThread;
        const messageArray: Message[] = [];

        addedMessage.map((message) => {
          messageArray.push({
            role: response.message.role,
            content: message.text.value,
            _id: response.message.id,
            metaData: response.message.metadata,
            isLoading: true,
          });
        });
        setMessages((messages) => [...messages, ...messageArray]);
      } catch (error) {
        //console.log(error);
      }
    };

    const handleInitialPromptPass = (prompt: string) => {
      const message: Message = {
        content: prompt,
        role: "user",
      };
      handleSend(message);
    };

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
        queryClient.invalidateQueries([
          "knowlee-agent",
          "user-threads-message",
          threadId,
        ]);
      }
    }, [queryClient, runningThreadData, threadId]);

    const pauseAudio = () => {
      if (speechToSpeechAudioElementRef.current && isPlaying) {
        speechToSpeechAudioElementRef.current.pause();
        setIsPlaying(false);
      }
    };


    const startRecording = () => document.getElementById(startRecordingButtonId)?.click();
    const stopRecording = () => document.getElementById(stopRecordingButtonId)?.click();

    const generateVoice = async (text: string) => {
      if (isPlaying) return;
      const audioId = await createAudio(text);
      if (!audioId) return;

      const audioUrl = await getAudio(audioId);
      if (!audioUrl) return;

      speechToSpeechAudioElementRef.current = new Audio(audioUrl);
      speechToSpeechAudioElementRef.current.addEventListener("ended", handleAudioEnd);

      playAudio();
    };

    const playAudio = () => {
      if (speechToSpeechAudioElementRef.current) {
        speechToSpeechAudioElementRef.current.play();
        setIsPlaying(true);
      }
    };

    const handleAudioEnd = () => {
      setIsPlaying(false);
      startRecording()
    };

    useEffect(() => {
      // audio is playing and voice chat toggle is turns off
      // we pause the currently playing audio 
      if (!speechToSpeechToggle && isPlaying) {
        return pauseAudio()
      }
      if (!threadResponse || !speechToSpeechToggle || isRecording) return;
      const lastMessage = threadResponse[threadResponse?.length - 1]
      if (lastMessage.role === "user") return;

      const contentToBeSpoken = threadResponse[threadResponse?.length - 1].content
      const message = contentToBeSpoken.map((message) => message.text.value).join(' ')
      generateVoice(message)

      return () => {
        if (speechToSpeechAudioElementRef.current) {
          setIsPlaying(false);
          speechToSpeechAudioElementRef.current.removeEventListener("ended", handleAudioEnd);
          speechToSpeechAudioElementRef.current.pause();
        }
      };

    }, [threadResponse, speechToSpeechToggle])

    if (threadId && isLoadingThreadMessages) {
      return (
        <Box
          position={"absolute"} // Use absolute positioning
          top={0}
          left={0}
          width={"100%"} // Cover the full width
          height={"100%"} // Cover the full height
          display={"flex"} // Add flex display
          justifyContent={"center"} // Center content horizontally
          alignItems={"center"} // Center content vertically
        >
          <Spinner speed="0.8s" color="primary.50" />
        </Box>
      );
    }
    const isRequestInProgress = ["queued", "in_progress"].includes(runningThreadData?.status || "")
    return (
      <Flex width="full">
        <Box
          width={["100%", "100%"]}
          height="full"
          borderRight="1px solid"
          borderColor={["transparent", "transparent", borderColor]}
          transition={"width 0.3s ease"}
        >
          <Box
            width="full"
            borderBottom="1px solid"
            borderBottomColor={borderColor}
            padding={["0px", "0px", "24px", "0px"]}
            boxSizing="border-box"
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Flex
                width="full"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  as="h2"
                  color={headingTextColor}
                  fontSize="20px"
                  fontWeight="500"
                  lineHeight="28px"

                >
                  {isOpenChatHistoryDrawer ? "Chat History" : "Knowlee Chat "}
                  <Tooltip label="Football fixture assistant" fontSize="sm">
                    <span>
                      <InfoIcon boxSize="14px" />
                    </span>
                  </Tooltip>
                </Text>
                {/* open chat history button only for mobile */}
                <Box
                  display={["flex", "flex", "none"]}
                  justifyContent="end"
                  alignItems="center"
                >
                </Box>
              </Flex>
              <Box display={["flex", "flex", "none"]} justifyContent="end">
                <Button
                  variant="unstyled"
                  onClick={onOpenMobileMenu}
                  display="flex"
                  justifyContent="end"
                >
                  <MobileMenuIcon />
                </Button>
                <MobileMenuDrawer
                  isOpen={isOpenMobileMenu}
                  onClose={onCloseMobileMenu}
                />
              </Box>
            </Flex>
          </Box>
          <Flex
            flexDir="column"
            p={["12px", "12px", "12px"]}
            // height={["calc(100% - 65px)", "calc(100% - 65px)", "calc(100% - 74px)"]}
            height="60vh"
            justifyContent="flex-end"
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
                overflow={"auto"}
                ref={messagesEndRef}
                flexGrow={1}
                mb={isRequestInProgress ? "10px": ""}
              >
                {!threadResponse || !threadResponse?.length ? (
                  <Flex height="98%" alignItems="end">
                    <Grid templateColumns="repeat(2, 1fr)" w="100%" gap={2}>
                      {initialPrompts.map((prompt) =>
                        prompt ? (
                          <GridItem w="100%">
                            <Flex
                              onClick={() => handleInitialPromptPass(prompt)}
                              w="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              role="button"
                              border="1px solid"
                              borderColor={borderColor1} // Use color mode value
                              borderRadius="lg"
                              p={2}
                              m={0}
                              transition="all 350ms"
                              color={color} // Use color mode value
                              _hover={{
                                color: hoverTextColor, // You might want to change this for dark mode as well
                                boxShadow: "md",
                                borderColor: hoverBorderColor, // Use color mode value
                              }}
                              bg={bgColor} // Use color mode value
                            >
                              <Text
                                fontSize="15px"
                                color={textColor}
                                noOfLines={1}
                              >
                                {prompt}
                              </Text>
                              <ArrowForwardIcon boxSize={6} />{" "}
                              {/* Adjust icon size if needed */}
                            </Flex>
                          </GridItem>
                        ) : null
                      )}
                    </Grid>
                  </Flex>
                ) : null}
                {threadResponse?.map((message, index) => {
                  return <MessageBox key={index} message={message} />;
                })}
                { isRequestInProgress && <AIPendingBubble />}
              </Box>
              <Box mt={0}>
                <ThreadMessageChatInput
                  onSend={handleSend}
                  startRecordingButtonId={startRecordingButtonId}
                  stopRecordingButtonId={stopRecordingButtonId}
                  startRecording={startRecording}
                  stopRecording={stopRecording}
                  setIsRecording={setIsRecording}
                  setSpeechToSpeechToggleToggle={setSpeechToSpeechToggleToggle}
                  speechToSpeechToggle={speechToSpeechToggle}
                  disabled={
                    newQueryMutation.isError ||
                    Boolean(errorMessage)
                  }
                  errorMessage={errorMessage}
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  }