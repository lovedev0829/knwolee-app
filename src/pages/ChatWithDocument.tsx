import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { sendMessageWithPdfDocument } from "../api/requests/documentChatIndex";
import { PdfChat } from "../components/Chat/FileUpload/PdfChat";
import PageContainer from "../components/PageContainer";
import { Message } from "../utils/types";
import { getToken, useUserData } from "../api/queries";
import { useDocumentUserChatHistory } from "../api/queries/documentChatIndex";

export default function ChatWithDocument() {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { data: userData } = useUserData();
  const { data: userChatHistory, isLoading, isError } = useDocumentUserChatHistory();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //console.log(userChatHistory)

  const handleSend = async (message: Message, files: FileList | null) => {
    if (!userData) return;
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);
    try {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) {
        throw new Error("Failed to get token");
      }

      const formData = new FormData();
      if (files && files.length) {
        formData.append("file", files[0]);
      }
      formData.append("userId", userData.id);
      formData.append("query", message.content);

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
      //console.log(error)
      throw new Error(`Somthing went wrong when sending your message: ${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultMessage = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hello and ! I'm Knowlee!`,
      },
    ]);
  };


  useEffect(() => {
    if (userChatHistory) {
      setMessages(userChatHistory);
    }
    else {
      setDefaultMessage();
    }
  }, [userChatHistory]);


  if (isLoading) return <div>Loading chats...</div>;
  if (isError) return <div>Error...</div>
  return (
    <PageContainer 
    title={
        <Flex alignItems="center">
        <Text mr={2}>Knowlee Chats</Text>
        <Tooltip label="Additional information here" fontSize="md">
            <span>
            <InfoIcon boxSize="18px" />
            </span>
        </Tooltip>
        </Flex>
    }
    >
      <PdfChat
        messages={messages}
        loading={loading}
        onSend={handleSend}
      />
    </PageContainer>
  );
}
