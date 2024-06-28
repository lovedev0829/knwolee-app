import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import ThreadMessageChatInput from "../Chat/AgentChat/ThreadMessageChatInput";
import { IThreadMessage, Message, Role } from "src/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useId, useRef, useState } from "react";
import { getToken } from "src/api/queries";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetAgentThread,
  useGetRunStatus,
  useUserAgents,
} from "src/api/queries/knowleeAgentQuery";
import {
  useNewUserAgentThreadMutation,
  useSendMessageInAgentThreadMutation,
} from "src/api/mutations/agentThreads";
import { defaultInitialPrompts } from "src/utils/constants";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import AIPendingBubble from "../Chat/AIPendingBubble";
import MessageBox from "../Chat/AgentChat/MessageBox";
import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import { Select } from "chakra-react-select";
import StepIndicator from "./StepProgressionIndicator";
import { useCreateNewSegmentationMutation, useUpdateProfileMutation } from "src/api/mutations/userIndex";
import { useSubscriptionModalStore } from "src/store";
import { useCancelRunMutation } from "src/api/mutations/knowleeAgentIndex";

const serverURL = import.meta.env.VITE_APP_SERVER_URL as string;

interface NewOnboardingSegmentationProps {
  isOpen: boolean;
  onClose: () => void;
  setIndexCurrentStep: (step: number) => void;
  currentStep: number;
  formValues: { name: string; role: { label: string; value: string }; theme: string };
  setFormValues: React.Dispatch<
    React.SetStateAction<{ name: string; role: { label: string; value: string }; theme: string }>
  >;
}

type roleType = {
  label: string;
  value: string;
};

export const assistantName = "Knowlee";
export const assistant_id = "asst_TXPtobSTfuurPcgQMn78jAAO";

const NewOnboardingSegmentationStep1: React.FC<
  NewOnboardingSegmentationProps
>   = ({ isOpen, onClose, setIndexCurrentStep, currentStep, formValues, setFormValues }) => {
  const [threadId, setThreadId] = useState<string>("");
  const createNewUserAgentThreadMutation = useNewUserAgentThreadMutation();
  const updateProfileMutation = useUpdateProfileMutation();
  const { colorMode, setColorMode } = useColorMode();
  const [isRecording, setIsRecording] = useState(false);
  const [speechToSpeechToggle, setSpeechToSpeechToggleToggle] =
    useState<boolean>(false); // State for toggle button
  const modalOverlayBgColor = useColorModeValue(
    undefined,
    "rgba(35, 38, 39, 0.90)"
  );
  const modalContentBgColor = useColorModeValue(undefined, "neutral.100");
  const borderColor = useColorModeValue("neutral.30", "neutral.80");
  const color = useColorModeValue("blackAlpha.800", "whiteAlpha.900");
  const hoverBorderColor = useColorModeValue("gray.400", "gray.500");
  const hoverTextColor = useColorModeValue("blackAlpha.900", "whiteAlpha.900");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.900");
  const bgColor = useColorModeValue("white", "neutral.90");
  const headingColor = useColorModeValue("#c1bdbd", "#ffffff40");

  const queryClient = useQueryClient();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [streamIsLoading, setStreamIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showInitialPrompts, setShowInitialPrompts] = useState(false);
  const userNewSegmentationMutation = useCreateNewSegmentationMutation();

  const { data: userAgents } = useUserAgents();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data: sendMessageData,
  } = useSendMessageInAgentThreadMutation(threadId || "");
  const { data: runningThreadData } =
    useGetRunStatus(
      sendMessageData?.createdRun.thread_id || "",
      sendMessageData?.createdRun?.id || "",
      threadId
    );

  const handleInitialPromptPass = (prompt: string) => {
    const message: Message = {
      content: prompt,
      role: "user",
    };
    handleSend(message);
  };
  const startRecordingButtonId = useId();
  const stopRecordingButtonId = useId();
  const isRequestInProgress = ["queued", "in_progress"].includes(
    runningThreadData?.status || ""
  );

  const {
    data: threadResponse,
    refetch: refetchThreadMessages,
    isFetching: isFetchingThreadMessages,
    isLoading: isLoadingThreadMessages,
  } = useGetAgentThread({
    threadId: threadId,
    enabled: Boolean(threadId && !isStreaming && !streamIsLoading),
  });

  const initialPrompts = defaultInitialPrompts;

  const { mutateAsync: cancelRun, isLoading: cancelingRun } =
    useCancelRunMutation();

  function handleDoneStreaming(userThreadId?: string) {
    // refetch all thread messages
    refetchThreadMessages();
    // to update chat tokens count
    queryClient.invalidateQueries([
      "knowlee-agent",
      "user-threads",
      userThreadId,
      "runs",
    ]);
    // to update remaining tokens
    queryClient.invalidateQueries(["user-usage"]);
    setStreamIsLoading(false);
    setIsStreaming(false);
  }

  function handleCancelRun() {
    cancelRun({ userThreadId: threadId });
    handleDoneStreaming();
  }

  const handleSend = async (message: Message) => {
    try {
      setStreamIsLoading(true);
      let userThreadId = threadId;
      if (!userThreadId) {
        // create new thread
        const createdThread = await createNewUserAgentThreadMutation.mutateAsync({
          title: `Chatting with ${assistantName}`,
          assistantId: assistant_id,
        });
        if (createdThread?._id) {
          userThreadId = createdThread?._id;
          setThreadId(createdThread?._id);
        }
      }
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
              assistant_id: assistant_id,
              thread_id: userThreadId,
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

      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      const response = await fetch(
        `${serverURL}api/knowlee-agent/threads/${userThreadId}/runs/stream`,
        {
          method: "POST",
          body: JSON.stringify({
            textMessage: message.content,
            assistantId: assistant_id,
            title: `Chatting with ${assistantName}`,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.status === 402) {
        // Open subscription limit modal
        useSubscriptionModalStore.setState({ isOpen: true });
      }
      setIsStreaming(true);
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
          handleDoneStreaming(userThreadId);
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });
        responseTextMessage = responseTextMessage.concat(decodedChunk);
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
                return {
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
                };
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
                assistant_id: assistant_id || "",
                thread_id: userThreadId,
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
      // console.log("error----->", error);
    }
  };

  const startRecording = () =>
    document.getElementById(startRecordingButtonId)?.click();
  const stopRecording = () =>
    document.getElementById(stopRecordingButtonId)?.click();

  const rolesList = [
    { label: "Digital Marketer", value: "digital_marketer" },
    { label: "Content Creator", value: "content_creator" },
    { label: "Journalist", value: "journalist" },
    { label: "Project Manager", value: "project_manager" },
    { label: "Educator", value: "educator" },
    { label: "Student", value: "student" },
    { label: "Software Developer", value: "software_developer" },
    { label: "Customer Support Specialist", value: "customer_support_specialist" },
    { label: "HR Professional", value: "hr_professional" },
    { label: "Finance Professional", value: "finance_professional" },
  ];
    
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

  // Validation functions
  const validateName = (name: string) => {
    let error;
    if (!name) {
      error = 'Please enter your name.';
    }
    return error;
  };

  const validateRole = (role: { label: string; value: string }) => {
    let error;
    if (!role || !role.value) {
      error = 'Please select a role from the list.';
    }
    return error;
  };

  if (
    (threadId && isLoadingThreadMessages) ||
    (!threadResponse?.length && streamIsLoading)
  ) {
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
        color="primary.40"
      >
        <Spinner speed="0.8s" color="primary.50" />
      </Box>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"6xl"} isCentered={true}>
      <ModalOverlay bg={modalOverlayBgColor} />
      <ModalContent
        p="48px 40px 48px 40px "
        borderRadius="24px"
        backgroundColor={modalContentBgColor}
        boxSize="border-box"
      >
        <ModalHeader position={"absolute"} top={"0"} right={"0"}>
          <StepIndicator
            currentStep={currentStep}
            setIndexCurrentStep={setIndexCurrentStep}
          />
        </ModalHeader>
        <SimpleGrid columns={[1, 1, 2]} spacing={10}>
          <Box
            maxHeight={"500px"}
            maxWidth={"100%"}
            className="scroll-hover"
            width={"100%"}
            h={"100%"}
            display={["none", "none", "flex" ]}
            flexDirection={"column"}
            overflow={"auto"}
            bg={colorMode === "dark" ? "#1E1F20" : "#F4F8FF"}
            borderRadius={"20px"}
            padding={"16px 12px"}
          >
            <Box
              className="scroll-hover"
              overflow={"auto"}
              flexGrow={1}
              mb={isRequestInProgress || streamIsLoading ? "10px" : ""}
            >
              {showInitialPrompts ? (
                <Flex height="98%" alignItems="end">
                  <Grid templateColumns="repeat(2, 1fr)" w="100%" gap={2}>
                    {initialPrompts.map((prompt) =>
                      prompt ? (
                        <GridItem w="100%" key={prompt}>
                          <Flex
                            onClick={() => handleInitialPromptPass(prompt)}
                            w="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            role="button"
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="lg"
                            p={2}
                            m={0}
                            transition="all 350ms"
                            color={color}
                            _hover={{
                              color: hoverTextColor,
                              boxShadow: "md",
                              borderColor: hoverBorderColor,
                            }}
                            bg={bgColor}
                          >
                            <Text
                              fontSize="15px"
                              color={textColor}
                              noOfLines={1}
                            >
                              {prompt}
                            </Text>
                            <ArrowForwardIcon boxSize={6} />
                          </Flex>
                        </GridItem>
                      ) : null
                    )}
                  </Grid>
                </Flex>
              ) : null}

              {threadResponse?.map((message, index) => {
                return (
                  <div key={index}>
                    {message.role === "assistant" && (
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {userAgents?.find(
                          (agent) =>
                            agent.assistant.id === message?.assistant_id
                        )?.assistant.name || "Knowlee Assistant"}
                      </span>
                    )}
                    <MessageBox key={index} message={message} />
                  </div>
                );
              })}

              {(isRequestInProgress || streamIsLoading) && <AIPendingBubble />}

              <div ref={messagesEndRef}></div>
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
                  isStreaming ||
                  isRequestInProgress ||
                  streamIsLoading ||
                  Boolean(threadResponse && threadResponse?.length > 3)
                }
                key={threadId}
                handleCancelRun={handleCancelRun}
                cancelingRun={cancelingRun}
              />
              <Text
                fontSize="14px"
                fontWeight={800}
                color="gray.600"
                textAlign="left"
                mt={2}
              >
                {assistantName} Assistant
              </Text>
            </Box>
          </Box>
          <Box
            p={5}
            maxW="500px"
            overflow="hidden"
          >
            <Text fontSize="4xl" fontWeight={"bold"}>
              Let's kick off
            </Text>
            <Text fontSize="3xl" fontWeight={"bold"} mb="8px" color={headingColor}>
              Tell Knowlee about yourself
            </Text>
            <Formik
              initialValues={formValues}
              onSubmit={(values) => {
                setFormValues(values);
                userNewSegmentationMutation.mutate({ professions: values.role.value });

                // update username and onboarding step
                const formData = new FormData();
                formData.append("username", values.name);
                formData.append("onboardingStep", "2");

                updateProfileMutation.mutate(formData);
                setIndexCurrentStep(currentStep + 1);
                return;
              }}
            >
              {({ values, handleChange, setFieldValue, handleSubmit, errors, touched }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <FormControl id="name" mb="4" isInvalid={!!errors.name && touched.name}>
                      <FormLabel>What's your name?</FormLabel>
                      <Field
                        as={Input}
                        name="name"
                        placeholder="Write your name"
                        validate={validateName} // Independent validation function
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFormValues({ ...values, name: e.target.value });
                        }}
                        value={values.name}
                      />
                      {errors.name && touched.name ? (
                        <Text color="red.500">{errors.name}</Text>
                      ) : null}
                    </FormControl>

                    <FormControl id="role" mb="4" isInvalid={!!errors.role && !!touched.role}>
                      <FormLabel>What's your role?</FormLabel>
                      <Field
                        as={Select}
                        name="role"
                        placeholder="Select a role"
                        validate={() => validateRole(values.role)} // Independent validation function
                        onChange={(value: roleType) => {
                          setFormValues({ ...values, role: value });
                          setFieldValue("role", value);
                        }}
                        value={values.role}
                        options={rolesList}
                      />
                      {errors.role && touched.role ? (
                        <Text color="red.500">{String(errors.role)}</Text>
                      ) : null}
                    </FormControl>

                    <FormControl id="theme" mb="4">
                      <FormLabel>How do you want things to look?</FormLabel>
                      <ButtonGroup gap="2">
                        <Button
                          onClick={() => {
                            setFieldValue("theme", "dark");
                            setFormValues({ ...values, theme: 'dark' });
                            setColorMode("dark");
                          }}
                          colorScheme={
                            values.theme === "dark" ? "blue" : "gray"
                          }
                        >
                          Dark
                        </Button>
                        <Button
                          onClick={() => {
                            setFieldValue("theme", "light");
                            setFormValues({ ...values, theme: 'light' });
                            setColorMode("light");
                          }}
                          colorScheme={
                            values.theme === "light" ? "blue" : "gray"
                          }
                        >
                          Light
                        </Button>
                      </ButtonGroup>
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width={"full"}>
                      Continue
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </SimpleGrid>
      </ModalContent>
    </Modal>
  );
};

export default NewOnboardingSegmentationStep1;
