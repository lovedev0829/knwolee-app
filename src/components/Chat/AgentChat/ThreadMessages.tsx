import {
  Box,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { Fragment, ReactElement, useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { IThreadMessage, Message, Role } from "../../../utils/types";
import AIPendingBubble from "../AIPendingBubble";
import { getToken } from "src/api/queries";
import { useAuth0 } from "@auth0/auth0-react";
import MessageBox from "./MessageBox";
import {
  useGetAgentThread,
  useUserAgents,
} from "src/api/queries/knowleeAgentQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useNewUserAgentThreadMutation } from "src/api/mutations/agentThreads";
import ThreadMessageChatInput from "./ThreadMessageChatInput";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";
import { useUserScrapedData } from "src/api/queries";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import { useOpenAITextToSpeechMutation } from "src/api/mutations/openAIMutation";
import AuthorizeOptions from "./AuthorizeOptions";
import { useSubscriptionModalStore } from "src/store";
import { useCancelRunMutation } from "src/api/mutations/knowleeAgentIndex";

const serverURL = import.meta.env.VITE_APP_SERVER_URL as string;

interface Props {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
  agentId?: string;
  agentName: string;
  initialPrompts: string[];
  firstQuestion?: string;
  setAgentId: React.Dispatch<React.SetStateAction<string>>;
}
interface Patterns {
  [key: string]: RegExp; // This allows any string to index a RegExp type
}

export const Header = styled.div`
  text-align: center;
  font-size: 64px;
  font-family: editor;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

function ThreadMessages({ agentId, agentName, initialPrompts = [], firstQuestion = "", setAgentId }: Props) {
  const navigate = useNavigate()
  const location = useLocation();

  const toast = useToast();
  const borderColor = useColorModeValue("neutral.30", "neutral.80");
  const queryClient = useQueryClient();
  const assistantName = agentName || 'Knowlee';
  const params = useParams();
  const [threadId, setThreadId] = useState(params?.threadId);
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { data: userUsageStat } = useUserUsageStats();
  const bgColor = useColorModeValue('white', 'neutral.90');
  const color = useColorModeValue('blackAlpha.800', 'whiteAlpha.900');
  const hoverBorderColor = useColorModeValue('gray.400', 'gray.500');
  const hoverTextColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900'); // Adjusted for hover text color
  const textColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.900');
  // generalise hardcoded message for all google related functionalities
  // const googleRequireMessage = 'Knowlee needs access to your Google account in order to use its features. To allow access, kindly click the "Authorize" button below. If you would prefer not to use this functionality, you can also skip this step.'
  const googleRequireMessage = "Connect your account so Knowlee can help you manage your tasks and handle your requests on its own. This connection enhances Knowlee's ability to provide tailored assistance and proactive support directly aligned with your needs. Ready to get started? Just click the 'Connect' button below."
  const microsoftRequireMessage = "Link your Microsoft account to enable Knowlee to seamlessly manage your appointments, emails, and documents. This integration allows Knowlee to offer personalized assistance and proactive solutions that cater specifically to your preferences and requirements. Begin enhancing your productivity by clicking 'Connect' now."
  const linkedinRequireMessage = "Connect your LinkedIn account to empower Knowlee to optimize your professional networking and job search efforts. By linking your account, Knowlee can provide customized recommendations and proactive outreach that aligns with your career goals. Activate this service by selecting the 'Connect' button."
  const twitterRequireMessage = "Integrate your Twitter account with Knowlee to streamline your social media interactions and content management. This connection enhances Knowlee’s ability to offer targeted insights and proactive engagement strategies, making your Twitter experience more efficient and personalized. Click 'Connect' to get started."
  const mediumRequireMessage = "Link your Medium account to allow Knowlee to assist with managing your reading lists and publishing activities. This integration empowers Knowlee to provide highly tailored content suggestions and proactive writing support, enhancing your Medium experience. To begin, just click the 'Connect' button below."
  const slackRequireMessage = "Connect your slack account so Knowlee can help you manage your tasks and handle your requests on its own. This connection enhances Knowlee's ability to provide tailored assistance and proactive support directly aligned with your needs. Ready to get started? Just click the 'Connect' button below."
  const trelloRequireMessage = "Connect your trello account so Knowlee can help you manage your tasks and handle your requests on its own. This connection enhances Knowlee's ability to provide tailored assistance and proactive support directly aligned with your needs. Ready to get started? Just click the 'Connect' button below."
  const notionRequireMessage = "Empower Knowlee by connecting your Notion account, enabling it to assist you in organizing your life and work seamlessly. This link allows Knowlee to offer customized support and proactive management, making your Notion experience more intuitive and efficient. Click 'Connect' to get started.";
  const discordRequireMessage = "Connect your Discord account with Knowlee to transform your communication and community engagement. This integration lets Knowlee provide tailored assistance and proactive solutions, enhancing your Discord interactions. Ready to level up? Click the 'Connect' button below.";
  const telegramRequireMessage = "Link your Telegram account to allow Knowlee to manage your chats and streamline your communication effortlessly. This connection empowers Knowlee to offer personalized assistance and proactive support, making your Telegram experience smoother and more efficient. Click 'Connect' to begin.";
  const tiktokRequireMessage = "Sync your TikTok account with Knowlee to elevate your content creation and engagement. This integration enables Knowlee to provide creative insights and proactive support, making your TikTok journey more dynamic and tailored to your style. Ready to go viral? Click 'Connect' now.";

  const [errorMessage, setErrorMessage] = useState("");
  const [streamIsLoading, setStreamIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingThreadId, setStreamingThreadId] = useState<string>();
  const [showInitialPrompts, setShowInitialPrompts] = useState(false);
  // const [abortController, setAbortController] = useState<AbortController>();
  const speechToSpeechAudioElementRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [speechToSpeechToggle, setSpeechToSpeechToggleToggle] = useState<boolean>(false); // State for toggle button
  const startRecordingButtonId = useId()
  const stopRecordingButtonId = useId()

  const {
    data: threadResponse,
    isLoading: isLoadingThreadMessages,
    refetch: refetchThreadMessages,
    isFetching: isFetchingThreadMessages,
  } = useGetAgentThread({
    threadId: threadId,
    enabled: Boolean(threadId && !isStreaming && !streamIsLoading),
  });

  const { data: userDataSources } = useUserScrapedData();
  const { data: thirdPartyConfig } = useThirdPartyConfig();
  const createNewUserAgentThreadMutation = useNewUserAgentThreadMutation();
  const { data: userAgents } = useUserAgents();

  const { mutateAsync: audioBuffer } = useOpenAITextToSpeechMutation();
  const [previousMessage, setPreviousMessage] = useState<IThreadMessage>();

  const { data: userSubsriptionRes } = useGetUserSubscription();

  const { mutateAsync: cancelRun, isLoading: cancelingRun } =
    useCancelRunMutation();

  function handleDoneStreaming(userThreadId?: string) {
    // refetch all thread messages
    refetchThreadMessages();
    // to update chat tokens count
    queryClient.invalidateQueries([
      "knowlee-agent",
      "user-threads",
      userThreadId || streamingThreadId,
      "runs",
    ]);
    // to update remaining tokens
    queryClient.invalidateQueries(["user-usage"]);
    setStreamIsLoading(false);
    setIsStreaming(false);
    setStreamingThreadId(undefined);
  }

  function handleCancelRun() {
    if (!streamingThreadId) return;
    cancelRun({ userThreadId: streamingThreadId });
    // // aborting the request makes response message blank
    // if (abortController) {
    //   abortController.abort();
    // }
    handleDoneStreaming();
  }

  const handleSend = async (message: Message) => {
    try {
      setStreamIsLoading(true);

      // if (!userDataSources || !userDataSources?.entityList?.length)
      //   return toast({
      //     title: "Oops! It seems like you haven't added a knowledge source yet.",
      //     description: "Let's add one to chat with Knowlee!",
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //   });

      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      //   const res = await axios.post(
      //     `knowlee-agent/threads/${threadId!}/runs/stream`,
      //     {
      //       textMessage: message.content,
      //       assistantId: agentId,
      //       title: `Chatting with ${assistantName}`
      //     },
      //     {
      //         responseType: "stream",
      //         headers: { Authorization: `Bearer ${token}` },
      //         // onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
      //         //   console.log(progressEvent);
      //         //     console.log(
      //         //         "progressEvent----->",
      //         //         (progressEvent.event as { currentTarget: { response: string } })
      //         //             ?.currentTarget?.response
      //         //     );
      //         // },
      //     }
      // );
      // console.log("res.data----->", res.data);

      let userThreadId = threadId;
      if (!threadId) {
        const createdThread =
          await createNewUserAgentThreadMutation.mutateAsync({
            title: `Chatting with ${assistantName}`,
            assistantId: agentId!,
          });
        userThreadId = createdThread?._id;
        if (createdThread) {
          setThreadId(userThreadId);
        }
      }
      setIsStreaming(true);
      setStreamingThreadId(userThreadId);

      // append user entered message
      queryClient.setQueryData(
        ["knowlee-agent", "user-threads-message", userThreadId],
        (prev?: IThreadMessage[]) => {
          return [
            ...(prev || []),
            {
              id: Date.now().toString(),
              object: "thread.message",
              created_at: Date.now(),
              assistant_id: agentId!,
              thread_id: userThreadId!,
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

      // const controller = new AbortController();
      // setAbortController(controller);

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
          // signal: controller.signal,
        }
      );
      setStreamIsLoading(false);
      if (response && response.status === 402) {
        // Open subscription limit modal
        useSubscriptionModalStore.setState({ isOpen: true });
      }
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
          handleDoneStreaming(userThreadId);
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });
        responseTextMessage = responseTextMessage.concat(decodedChunk);
        // console.log("decodedChunk------>", decodedChunk);
        // append assistant message to react query store
        queryClient.setQueryData(
          ["knowlee-agent", "user-threads-message", userThreadId],
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
                thread_id: userThreadId!,
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
        // scrollToBottom();
      }
    } catch (error) {
      setStreamIsLoading(false);
      setIsStreaming(false);
      setStreamingThreadId(undefined);
      // console.log("error----->", error);
    }
  };

  const hasCreditsLeft = () => {
    if (!userUsageStat || !userSubsriptionRes) return false;

    const { tokenUsed = 0, totalRunTokenUsed = 0, credit: { total: creditTotal = 0 } = {} } = userUsageStat;
    const { plan } = userSubsriptionRes.userSubscription;

    if (!plan || typeof plan === "string") return false;

    return (tokenUsed + totalRunTokenUsed - creditTotal) < plan?.features?.maxTokens;
  };

  const handleInitialPromptPass = (prompt: string) => {
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

    const message: Message = {
      content: prompt,
      role: "user",
    };
    handleSend(message);
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [threadId, threadResponse]);

  useEffect(() => {
    if (userUsageStat && userSubsriptionRes) {
      const { tokenUsed = 0, totalRunTokenUsed = 0, credit } = userUsageStat;
      const { total = 0, used = 0 } = credit || {};
      // If the user has remaining credit, they are allowed to proceed
      if (total - used > 0) return;
      const { plan } = userSubsriptionRes.userSubscription;
      if (!plan || typeof plan === "string") return;
      if ((tokenUsed + totalRunTokenUsed) >= plan?.features?.maxTokens) {
        setErrorMessage(
          `You have exhausted your credits. Please upgrade your plan or purchase additional credits.`
        );
        return;
      }
    }
    return () => {
      setErrorMessage("");
    };
  }, [userSubsriptionRes, userUsageStat]);

  useEffect(() => {

    if (firstQuestion != "") {
      handleInitialPromptPass(firstQuestion);
    }

    return () => {
      const { question, ...restState } = (location.state as { question?: string;[key: string]: unknown }) || {};
      navigate("", { state: restState });
      firstQuestion = "";
    };
  }, []);

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
    if (!text) return;

    // create audio logic
    const resAudioBuffer = await audioBuffer({ text });

    // Check if audio data is valid
    if (!resAudioBuffer || !resAudioBuffer.data) {
      console.error("Invalid audio data received");
      return;
    }

    // Convert array buffer to Uint8Array
    const uint8Array = new Uint8Array(resAudioBuffer?.data);

    // Create Blob from Uint8Array
    const blob = new Blob([uint8Array], { type: 'audio/mpeg' });

    // Create URL from Blob
    const audioUrl = URL.createObjectURL(blob);

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
    // audio is playing and voice chat toggle is turned off
    // we pause the currently playing audio
    if (!speechToSpeechToggle && isPlaying) {
      return pauseAudio()
    }
    if (!threadResponse || !speechToSpeechToggle || isRecording) return;
    const lastMessage = threadResponse[threadResponse?.length - 1];
    if (lastMessage?.role === "user") return;

    const contentToBeSpoken = lastMessage?.content;
    const message = contentToBeSpoken
      ?.map((message) => message.text.value)
      .join(" ");

    if (
      lastMessage !== previousMessage
    ) {
      generateVoice(message);
      setPreviousMessage(lastMessage);
    }
  }, [threadResponse, speechToSpeechToggle]);

  useEffect(() => {
    if (streamIsLoading || isFetchingThreadMessages || isStreaming) {
      setShowInitialPrompts(false);
      return;
    }
    setShowInitialPrompts(Boolean(!threadResponse?.length));
  }, [
    isFetchingThreadMessages,
    isStreaming,
    streamIsLoading,
    threadResponse?.length,
  ]);

  useEffect(() => {
    setThreadId(params?.threadId);
  }, [params?.threadId]);

  if (
    (threadId && isLoadingThreadMessages) ||
    (!threadResponse?.length && streamIsLoading)
  ) {
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

  function matchOpenAiFunctionCall() {
    const userAgent = userAgents?.find(agent => agent.assistant.id === agentId);
    const functionNames = userAgent?.functionDefinitions?.map(obj => obj.functionDefinition?.name);

    const googlePattern = /^(gmail_users_|google_calendar_|google_keep_)/;
    const microsoftPattern = /^(microsoft_|outlookmail_users_|outlookcalendar_users_|outlookOneNote_users_|outlookteams_users_)/;
    const twitterPattern = /^(twitter_)/;
    const linkedinPattern = /^(linkedin_)/;
    const mediumPattern = /^(medium_)/;
    const slackPattern = /^(slack_)/;
    const trelloPattern = /^(trello_)/;
    const notionPattern = /^(notion_)/;

    const patterns: Patterns = {
      google: googlePattern,
      microsoft: microsoftPattern,
      linkedin: linkedinPattern,
      twitter: twitterPattern,
      medium: mediumPattern,
      slack: slackPattern,
      trello: trelloPattern,
      notion: notionPattern,
      // Add more patterns as needed
    };

    const result: string[] = [];

    functionNames?.forEach((fn) => {
      Object.entries(patterns).forEach(([key, pattern]) => {
        if (pattern.test(fn)) {
          if (!result.includes(key)) {
            result.push(key);
          }
        }
      });
    });

    const components: ReactElement[] = [];

    result.forEach((provider) => {
      switch (provider) {
        case "google":
          if (!thirdPartyConfig?.google?.token?.access_token) {
            components.push(<AuthorizeOptions provider="Google" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={googleRequireMessage} />);
          }
          break;
        case "microsoft":
          if (!thirdPartyConfig?.microsoft?.token?.access_token) {
            components.push(<AuthorizeOptions provider="Microsoft" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={microsoftRequireMessage} />);
          }
          break;
        case "linkedin":
          if (!thirdPartyConfig?.linkedin?.token?.access_token) {
            components.push(<AuthorizeOptions provider="Linkedin" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={linkedinRequireMessage} />);
          }
          break;
        case "twitter":
          if (!thirdPartyConfig?.twitter?.token?.access_token) {
            components.push(<AuthorizeOptions provider="Twitter" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={twitterRequireMessage} />);
          }
          break;
        case "medium":
          if (!thirdPartyConfig?.medium?.token?.access_token) { components.push(<AuthorizeOptions provider="Medium" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={mediumRequireMessage} />); }
          break;
        case "slack":
          if (!thirdPartyConfig?.slack?.token?.access_token) { components.push(<AuthorizeOptions provider="Slack" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={slackRequireMessage} />); }
          break;
        case "trello":
          if (!thirdPartyConfig?.trello?.token?.access_token) { components.push(<AuthorizeOptions provider="Trello" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={trelloRequireMessage} />); }
          break;
        case "notion":
          if (!thirdPartyConfig?.notion?.token?.access_token) { components.push(<AuthorizeOptions provider="Notion" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={notionRequireMessage} />); }
          break;
        case "discord":
          if (!thirdPartyConfig?.discord?.token?.access_token) { components.push(<AuthorizeOptions provider="Discord" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={discordRequireMessage} />); }
          break;
        case "telegram":
          if (!thirdPartyConfig?.telegram?.token?.access_token) { components.push(<AuthorizeOptions provider="Telegram" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={telegramRequireMessage} />); }
          break;
        case "tiktok":
          if (!thirdPartyConfig?.tiktok?.token?.access_token) { components.push(<AuthorizeOptions provider="TikTok" setAgentId={setAgentId} createNewUserAgentThreadMutation={createNewUserAgentThreadMutation} text={tiktokRequireMessage} />); }
          break;
        default:
          break;
      }
    });

    return components;
  }

  return (
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
        flexGrow={1}
        mb={streamIsLoading ? "10px" : ""}
      >
        {showInitialPrompts ? (
          <Flex height="98%" alignItems="end">
            <Grid
              templateColumns='repeat(2, 1fr)' w="100%" gap={2}>
              {initialPrompts.map((prompt, index) => (
                prompt ?
                  <GridItem w='100%' key={index}>
                    <Flex
                      onClick={() => handleInitialPromptPass(prompt)}
                      w="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      role="button"
                      border="1px solid"
                      borderColor={borderColor} // Use color mode value
                      borderRadius="lg"
                      p={2}
                      m={0}
                      transition="all 350ms"
                      color={color} // Use color mode value
                      _hover={{
                        color: hoverTextColor, // You might want to change this for dark mode as well
                        boxShadow: "md",
                        borderColor: hoverBorderColor // Use color mode value
                      }}
                      bg={bgColor} // Use color mode value

                    >
                      <Text fontSize="15px" color={textColor} noOfLines={1}>{prompt}</Text>
                      <ArrowForwardIcon boxSize={6} /> {/* Adjust icon size if needed */}
                    </Flex>
                  </GridItem> : null
              ))}
            </Grid>
          </Flex>
        ) : null}

        {threadResponse?.map((message, index) => {
          return (
            <Fragment key={message?.id}>
              {message.role === "assistant" && (
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {userAgents?.find(agent => agent.assistant.id === message?.assistant_id)?.assistant.name || "Knowlee Assistant"}
                </span>
              )
              }
              <MessageBox key={index} message={message} />
            </Fragment>
          );
        })}

        {streamIsLoading && streamingThreadId === threadId && (
          <AIPendingBubble />
        )}

        <div ref={messagesEndRef}></div>
      </Box>
      <Box mb={2}>{
        // threadResponse?.length > 0 && matchOpenAiFunctionCall()
        matchOpenAiFunctionCall()
      }</Box>
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
            isStreaming ||
            Boolean(errorMessage) ||
            streamIsLoading ||
            matchOpenAiFunctionCall().length > 0
          }
          errorMessage={errorMessage}
          key={threadId}
          streamingThreadId={streamingThreadId}
          handleCancelRun={handleCancelRun}
          cancelingRun={cancelingRun}
        />
        <Text fontSize="xs" color="gray.600" textAlign="center" mt={2}>
          Knowlee can make mistakes. Check important info.
        </Text>
      </Box>
    </Box>
  );
}

export default ThreadMessages;
