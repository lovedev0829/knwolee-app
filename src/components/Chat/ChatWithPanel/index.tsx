import { useAuth0 } from "@auth0/auth0-react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNewConversationMutation } from "../../../api/mutations/conversationIndex";
import { getToken, useUserData } from "../../../api/queries";
import { sendMessageWithPdfDocument } from "../../../api/requests/documentChatIndex";
import { usePanelActions, usePanelOptions } from "../../../hooks/Panel";
import { assistantMessages } from "../../../hooks/Panel/usePanelOptions";
import { useChatsStore } from "../../../store";
import { ConfigOptions, PANEL_OPTIONS } from "../../../types/panel";
import { Message } from "../../../utils/types";
import { ChatInput } from "../ChatInput";
import { PdfChatInput } from "../FileUpload/PdfChatInput";
import MessageBox from "../MessageBox";
import { Panel } from "../Panel";
import AIPendingBubble from "../AIPendingBubble";
import ImageInterpreterChatInput from "../ImageInterpreterChatInput";
import TextToImageChatInput from "../TextToImageChatInput";
import VideoInterpreterChatInput from "../VideoInterpreterChatInput";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";

interface ChatWithPanelProps {
  resetingConversation: boolean;
  setResetingConversation: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = styled.div`
  text-align: center;
  font-size: 64px;
  font-family: editor;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

// ChatWithPanel doesn't need to store history, atm is all in one functionality chat
const ChatWithPanel: FC<ChatWithPanelProps> = ({
  resetingConversation,
  setResetingConversation,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { data: userData } = useUserData();
  const { data: userUsageStat } = useUserUsageStats();

  const [documentChatLoading, setDocumentChatLoading] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const { panelOption, setPanelOption, assistantMessage } = usePanelOptions();

  const { data: userSubsriptionRes } = useGetUserSubscription();

  useEffect(() => {
    // If the location state has the option property, use it to set the panel option
    if (location.state?.option && Object.values(PANEL_OPTIONS).includes(location.state.option)) {
      setPanelOption(location.state.option);
    }
  }, [location, setPanelOption]);

  const { messages, setMessages, handlePanelActions, isActionLoading, newConversation, setNewConversation, resetConversation } =
    usePanelActions();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });

  const createNewConversationMutation = useNewConversationMutation();
  const navigate = useNavigate();
  const { setPendingMessageData } = useChatsStore();

  const startDefaultChatBot = async (messageToSend: string) => {
    try {
      const newConversation = await createNewConversationMutation.mutateAsync({
        title: `New chatbot chat`,
      });
      if (!newConversation) return;
      const newConversationData = {
        conversationId: newConversation._id,
        messageToSend,
      };
      setPendingMessageData(newConversationData);
      navigate(`/knowleeagents/${newConversation._id}`);
    } catch (error) {
      //console.log(error);
    }
  };

  const handlePdfDocumentChatSend = async (
    message: Message,
    files: FileList | null
  ) => {
    if (!userData) return;
    onClose();
    try {
      const newMessage = message
      const formData = new FormData();
      if (files && files.length) {
        formData.append("file", files[0]);
        newMessage.metaData = {
          type: PANEL_OPTIONS.DOCUMENT,
          data: files[0].name,
        }
      }
      formData.append("userId", userData.id);
      formData.append("query", message.content);

      let conversationId: string;
      if (newConversation) {
        conversationId = newConversation._id;
      } else {
        const newConversationResponse = await createNewConversationMutation.mutateAsync({
          title: message.content,
        });
        if (!newConversationResponse) return;
        conversationId = newConversationResponse._id;
        setNewConversation(newConversationResponse);
      }
      formData.append("conversationId", conversationId);

      const updatedMessages = [...messages, message];

      setMessages(updatedMessages);
      setDocumentChatLoading(true);
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) {
        throw new Error("Failed to get token");
      }

      const response = await sendMessageWithPdfDocument(formData, token);

      if (!response) {
        throw new Error("No response from chat");
      }

      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: response,
        },
      ]);
    } catch (error) {
      //console.log(error);
      throw new Error(
        `Somthing went wrong when sending your message: ${error as string}`
      );
    } finally {
      setDocumentChatLoading(false);
    }
  };

  const handleSend = (message: Message, configOptions: ConfigOptions) => {
    // if there is no panel option selected then it is a default chat
    onClose();
    if (!panelOption || panelOption === PANEL_OPTIONS.SPEECHTOTEXT) {
      startDefaultChatBot(message.content);
      return;
    }
    handlePanelActions(message, panelOption, configOptions);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current.scrollHeight);
  };

  function renderInputField() {
    switch (panelOption) {
      case PANEL_OPTIONS.DOCUMENT:
        return (
          <PdfChatInput
            onSend={handlePdfDocumentChatSend}
            disabled={isQueryLoading || Boolean(errorMessage)}
            errorMessage={errorMessage}
          />
        );

      case PANEL_OPTIONS.IMAGE:
        return (
          <TextToImageChatInput
            onSend={handleSend}
            disabled={isQueryLoading || Boolean(errorMessage)}
            panelOption={panelOption}
            errorMessage={errorMessage}
          />
        );

      case PANEL_OPTIONS.IMAGE_INTERPRETER:
        return (
          <ImageInterpreterChatInput
            onSend={handleSend}
            disabled={isQueryLoading || Boolean(errorMessage)}
            panelOption={panelOption}
            errorMessage={errorMessage}
          />
        );

        case PANEL_OPTIONS.VIDEO_INTERPRETER:
        return (
          <VideoInterpreterChatInput
            onSend={handleSend}
            disabled={isQueryLoading || Boolean(errorMessage)}
            panelOption={panelOption}
            errorMessage={errorMessage}
          />
        );

      default:
        return (
          <ChatInput
            onSend={handleSend}
            disabled={isQueryLoading || Boolean(errorMessage)}
            panelOption={panelOption}
            errorMessage={errorMessage}
          />
        );
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cleanUpPreviousAssistantMessage = (messages: Message[]) => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return messages;
    const isAssistantMessage = Object.values(assistantMessages).includes(
      lastMessage.content
    );
    if (lastMessage.role === "assistant" && isAssistantMessage) {
      messages.pop();
    }
    return messages;
  };

  useEffect(() => {
    if (!assistantMessage) return;
    setMessages((prev) => [
      ...cleanUpPreviousAssistantMessage(prev),
      {
        role: "assistant",
        content: assistantMessage,
      },
    ]);
  }, [panelOption]);

  useEffect(() => {
    if (resetingConversation) {
      // open content panel 
      onOpen();
      // set default panel option
      setPanelOption(null);
      resetConversation();
      setResetingConversation(false);
    }
  }, [onOpen, resetConversation, resetingConversation, setPanelOption, setResetingConversation]);

  const isQueryLoading =
    isActionLoading || documentChatLoading || isActionLoading;

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
    return () => {
      setErrorMessage("");
    }
  }, [userSubsriptionRes, userUsageStat])

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent="space-between"
    >
      {/*<Panel
        option={panelOption}
        setOption={setPanelOption}
        isOpen={isOpen}
        onToggle={onToggle}
  />*/}
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
          {messages.map((message, index) => (
            <MessageBox key={index} message={message} />
          ))}
          {isQueryLoading && <AIPendingBubble />}
        </Box>
        <Box mt={4}>
          {renderInputField()}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWithPanel;
