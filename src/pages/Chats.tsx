import { InfoIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, CloseButton, Flex, Heading, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNewConversationMutation } from "src/api/mutations/conversationIndex";
import ChatWithPanel from "../components/Chat/ChatWithPanel";
import { Chat } from "../components/Chat";
import MobileMenuIcon from "src/Icons/MobileMenuIcon";
import MobileMenuDrawer from "src/components/PageContainer/MobileMenuDrawer";
import DotsHorizontalIcon from "src/Icons/DotsHorizontalIcon";
import ChatHistoryPanel from "src/components/Chat/ChatHistoryPanel";
import 
{
  Tooltip
} from "@chakra-ui/react";

export default function Chats() {
  const borderColor = useColorModeValue("#E8ECEF", "#343839");
  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const iconColor = useColorModeValue("neutral.60", "neutral.50");
  const buttonBGColor = useColorModeValue("neutral.20", "neutral.70");
  const { isOpen: isOpenMobileMenu, onOpen: onOpenMobileMenu, onClose: onCloseMobileMenu } = useDisclosure();
  const {
    isOpen: isOpenChatHistoryDrawer,
    onOpen: onOpenChatHistoryDrawer,
    onClose: onCloseChatHistoryDrawer,
  } = useDisclosure();
  const { conversationId } = useParams()

  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const [resetingConversation, setResetingConversation] = useState(false);

  const createNewConversationMutation = useNewConversationMutation()

  function handleNewChat() {
    // const newConversation = await createNewConversationMutation.mutateAsync({ title: "New chat" })
    // if (newConversation) {
    //   //console.log("newConversation----->", newConversation)
    //   navigate(`/knowleechats/${newConversation._id}`)
    // }
    if (conversationId) {
      navigate("/knowleechats");
    } else {
      setResetingConversation(true);
    }
  }

  // function handleNewPdfDocumentChat() {
  //     navigate(`/knowleechats/document`)
  // }

  function renderMainContent() {
    if (isOpenChatHistoryDrawer) {
      return <ChatHistoryPanel handleNewChat={handleNewChat} onCloseChatHistoryDrawer={onCloseChatHistoryDrawer} />
    }

    if (conversationId) {
      return <Chat setShowSidebar={setShowSidebar} showSidebar={showSidebar} />;
    }

    return (
      <ChatWithPanel
        resetingConversation={resetingConversation}
        setResetingConversation={setResetingConversation}
      />
    );
  }

  return (
    <Box w={"100%"} h={"100%"} display={"flex"}>
      <Box
        width={["100%", "100%", showSidebar ? "75%" : "calc(100% - 56px)"]}
        h={"100%"}
        borderRight="1px solid"
        borderColor={["transparent", "transparent", borderColor]}
        transition={"width 0.3s ease"}
      >
        <Box
          w={"100%"}
          borderBottom="1px solid"
          borderBottomColor={borderColor}
          p={["12px", "12px", "22px 40px 22px 40px"]}
          boxSizing="border-box"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Heading
              width="full"
              display="flex"
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
                <Tooltip label="Experience AI magic in one place: Convert text to audio in diverse voices, create stunning images using advanced models, interpret visuals, transform scripts into videos, handle documents with ease, and generate prompts from your voice recordings" fontSize="sm">
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
                {isOpenChatHistoryDrawer ? (
                  <CloseButton
                    variant="unstyled"
                    onClick={onCloseChatHistoryDrawer}
                    display="flex"
                    justifyContent="end"
                  />
                ) : (
                  <Button
                    variant="unstyled"
                    onClick={onOpenChatHistoryDrawer}
                    display="flex"
                    justifyContent="end"
                  >
                    <DotsHorizontalIcon />
                  </Button>
                )}
              </Box>
            </Heading>

            {/* Drawer for mobile screens */}
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
          // h={["calc(100% - 105px)", "calc(100% - 105px)", "calc(100% - 72px)"]}
          h="calc(100% - 72px)"
          p={["12px", "12px", "22px 40px 22px 40px"]}
        >
          <Flex h={"full"}>{renderMainContent()}</Flex>
        </Flex>
      </Box>
      {/*<Box
        width={showSidebar ? "25%" : "56px"}
        transition={"width 0.3s ease"}
        display={["none", "none", "block"]}
      >
        <Flex
          borderBottom="1px solid"
          borderBottomColor={borderColor}
          py={5}
          px={3}
          h={"72px"}
          boxSizing="border-box"
          gap={3}
          alignItems={"center"}
        >
          <Button
            size={"xs"}
            onClick={() => {
              setShowSidebar((prev) => !prev);
            }}
            bg={buttonBGColor}
          >
            {showSidebar ? (
              <ArrowRightIcon boxSize={2.5} color={iconColor} />
            ) : (
              <ArrowLeftIcon boxSize={2.5} color={iconColor} />
            )}
          </Button>
          {showSidebar && (
            <Heading
              as="h2"
              color={headingTextColor}
              fontSize="20px"
              fontWeight="500"
              lineHeight="28px"
            >
              Chat history
            </Heading>
          )}
        </Flex>
        {showSidebar && <ChatHistoryPanel handleNewChat={handleNewChat} />}
      </Box>*/}
    </Box>
  );
}
