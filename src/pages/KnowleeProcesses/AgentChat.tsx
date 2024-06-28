import { useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DotsHorizontalIcon from "src/Icons/DotsHorizontalIcon";
import ChatHistoryPanel from "src/components/Chat/AgentChat/ChatHistoryPanel";
import { useNewUserAgentThreadMutation } from "src/api/mutations/agentThreads";
import ThreadMessages from "src/components/Chat/AgentChat/ThreadMessages";
import MobileMenuIcon from "src/Icons/MobileMenuIcon";
import MobileMenuDrawer from "src/components/PageContainer/MobileMenuDrawer";
import { defaultInitialPrompts } from 'src/utils/constants'; 
import { useThreadRuns } from "src/api/queries/knowleeAgentQuery";
import ThreadTokenUsage from "src/components/AgentConversation/ThreadTokenUsage";

export default function AgentChat() {
  const borderColor = useColorModeValue("#E8ECEF", "#343839");
  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const iconColor = useColorModeValue("neutral.60", "neutral.50");
  const buttonBGColor = useColorModeValue("neutral.20", "neutral.70");
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
  const { threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: threadRuns } = useThreadRuns(threadId!);

  const chatTokens = useMemo(() => {
    if (!threadRuns) return 0;
    return threadRuns.reduce((prev, curr) => {
      if (curr.usage) {
        return prev + curr.usage.total_tokens;
      }
      return prev;
    }, 0);

  }, [threadRuns])

  const [agentId, setAgentId] = useState<string>((location.state as { assistantId: string })?.assistantId || "");
  const [agentName, setAgentName] = useState<string>("");
  const [initialPrompts, setInitialPrompts] = useState<string[]>((location.state as { initialPrompts: string[] })?.initialPrompts || defaultInitialPrompts);
  const [showSidebar, setShowSidebar] = useState(true);

  const createNewUserAgentThreadMutation = useNewUserAgentThreadMutation();

  // Use the selected agent, or the default one if none was selected
  const assistantId = agentId || "asst_TXPtobSTfuurPcgQMn78jAAO";
  const selectedAgentName = agentName || "Knowlee";
  

  async function handleNewChat() {
    //   if(!agentId) return toast({
    //     title: "Validation Error",
    //     description: "First, select an agent to chat with.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    // });

    const createdThread = await createNewUserAgentThreadMutation.mutateAsync({ title: `Chatting with ${selectedAgentName}`, assistantId: assistantId })
    if (createdThread) {
      // return navigate(`/knowlee-agents/agent-chat/${createdThread._id}`);
      return navigate(`/knowleechats/${createdThread._id}`);
    }
    // return navigate(`/knowlee-agents/agent-chat`);
    return navigate(`/knowleechats`);
  }

  function renderMainContent() {
    if (isOpenChatHistoryDrawer) {
      return (
        <ChatHistoryPanel
          handleNewChat={handleNewChat}
          onCloseChatHistoryDrawer={onCloseChatHistoryDrawer}
          setAgentId={setAgentId}
          setAgentName={setAgentName}
          setInitialPrompts={setInitialPrompts}
          agentId={agentId}
          isCreatingNewChat={createNewUserAgentThreadMutation.isLoading}
        />
      );
    }


    return <ThreadMessages setShowSidebar={setShowSidebar} showSidebar={showSidebar} agentId={agentId} agentName={agentName} initialPrompts={initialPrompts} setAgentId={setAgentId} />;

  }

  return (
    <Flex width="full">
      <Box
        width={["100%", "100%", showSidebar ? "75%" : "calc(100% - 56px)"]}
        height="full"
        borderRight="1px solid"
        borderColor={["transparent", "transparent", borderColor]}
        transition={"width 0.3s ease"}
      >
        <Box
          width="full"
          borderBottom="1px solid"
          borderBottomColor={borderColor}
          padding={["12px", "12px", `${showSidebar ?  "22px" : "18px"} 40px 22px 40px`]}
          boxSizing="border-box"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Flex
              width="full"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <Text
                  as="h2"
                  color={headingTextColor}
                  fontSize="20px"
                  fontWeight="500"
                  lineHeight="28px"
                >
                  {isOpenChatHistoryDrawer ? "Chat History" : "Knowlee Chat"}
                </Text>
                <Tooltip label="Select an assistant to start chatting! If you don't choose any, you'll talk to the default Knowlee Assistant." fontSize="sm">
                  <span>
                    <InfoIcon ml="1" boxSize="14px" mb="1" />
                  </span>
                </Tooltip>
              </Flex>
              {/* This Flex pushes the token count to the extreme right */}
              <Box display={["none", "none", "block"]}>
                <ThreadTokenUsage chatTokens={chatTokens} />
              </Box>
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
            </Flex>
            {/* hide mobile menu drawer for AI Processes - Chat */}
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
          {/* visible only on mobile screens */}
          <Box display={["block", "block", "none"]}>
            <ThreadTokenUsage chatTokens={chatTokens} />
          </Box>
        </Box>
        <Flex
          flexDir="column"
          p={["12px", "12px", "12px"]}
          height={["calc(100% - 65px)", "calc(100% - 65px)", "calc(100% - 74px)"]}
        // height="auto"
        >
          {renderMainContent()}
        </Flex>
      </Box>
      <Box
        width={showSidebar ? "25%" : "56px"}
        transition={"width 0.3s ease"}
        display={["none", "none", "block"]}
      >
        <Flex
          borderBottom="1px solid"
          borderBottomColor={borderColor}
          py="22px"
          px={3}
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
              noOfLines={1}
            >
              Chat history
            </Heading>
          )}
        </Flex>
        {showSidebar && (
          <ChatHistoryPanel
            handleNewChat={handleNewChat}
            setAgentId={setAgentId}
            setAgentName={setAgentName}
            setInitialPrompts={setInitialPrompts}
            agentId={agentId}
            isCreatingNewChat={createNewUserAgentThreadMutation.isLoading}
          />
        )}
      </Box>
    </Flex>
  );
}
