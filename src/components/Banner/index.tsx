import {
   ButtonGroup,
   Button,
   Stack,
   Text,
   Input,
   Flex,
   useBreakpointValue,
   useColorModeValue,
   useColorMode,
   useDisclosure,
   useToast,
   Box
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken, useUserData } from "../../api/queries";
import { Link } from "react-router-dom";
import InviteFriendsModal from "../Modal/InviteFriendsModal"
import FileUploadButton from "./FileUploadButton";
import { useState, useRef, KeyboardEvent } from "react";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import { useUserKnowledgeData } from "../../api/queries/index";
import { useUserAgents } from "src/api/queries/knowleeAgentQuery";
import { useUserProcesses } from "src/api/queries/knowleeProcessQuery"
import { PiPlusCircleFill } from "react-icons/pi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import RefIconComponent from "src/Icons/RefIconComponent";
import HelpIconComponent from "src/Icons/HelpIconComponent";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "../Dashboard/Icons/NotificationIcon";
import NotificationModal from "src/components/Notifications";
import { ArrowUpIcon, AttachmentIcon } from "@chakra-ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { FileUploadStatus, PdfUploadFormData } from "../../types/upload.interface";
import FileUploadModal from "../Sources/FileUpload/Modal";
import { UPLOAD_STATUS } from "../../utils/constants";
import { uploadFileFTB } from "../../api/requests/uploadIndex";
import { AxiosError } from "axios";
import { ServerResponse } from "src/api/requests/client";

const Banner = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const {
      user: userAuth0Data,
      isLoading: isAuthLoading,
   } = useAuth0();

   const { colorMode } = useColorMode();
   const [openFriendModal, setFriendModal] = useState(false);
   const titleColor = useColorModeValue("neutral.100", "neutral.10");
   const subTitleColor = useColorModeValue("rgb(193 189 189)", "rgb(255 255 255 / 25%)");

   const { data: userDBData, isLoading: isDbDataLoading } = useUserData();
   const { data: thirdPartyConfig } = useThirdPartyConfig();
   const { data: userEntities } = useUserKnowledgeData();
   const { data: userAgents } = useUserAgents();
   const { data: userProcessesList } = useUserProcesses();
   const chatRef = useRef<HTMLInputElement | null>(null);
   const navigate = useNavigate();

   const getUserDisplayedName = () => {
      if (isAuthLoading || isDbDataLoading) return ".....";
      const name = userDBData?.username || userAuth0Data?.name || "User";
      const message = "Hello " + name;
      return message;
   };

   const onFriendModalClose = () => {
      setFriendModal(!openFriendModal);
   }

   const handleQuestion = () => {
      const question = "What services does Knowlee offer?";
      if (chatRef.current) {
         chatRef.current.value = question;
      }
   };

   const btnStyle = {
      colorScheme: "gray",
      variant: "solid",
      _hover: { bgColor: "#E0ECFF", color: "black" },
   }

   const activatedStyle = {
      backgroundColor: useColorModeValue("#3FDD78", ""),
      textDecorationLine: "line-through",
      color: "black",
      bgColor: "#3FDD78"
   }

   const handleChat = () => {
      const question = chatRef.current?.value;
      navigate("/knowleechats", { state: { question } })
   }

   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         handleChat();
      }
   };

   const queryClient = useQueryClient();
   const toast = useToast();
   const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
   const { data: userData } = useUserData();

   const [uploadStatus, setUploadSatus] = useState<FileUploadStatus>(UPLOAD_STATUS.IDLE);

   const createPdfUploadFormData = (data: PdfUploadFormData): FormData => {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("userId", data.userId);
      return formData;
   };

   const {
      isOpen: isOpenNotificationModal,
      onOpen: onOpenNotificationModal,
      onClose: onCloseNotificationModal,
   } = useDisclosure();
   const handleFileUpload = async (file: File) => {
      if (!userData || !file) return;

      setUploadSatus(UPLOAD_STATUS.UPLOADING)

      const data: PdfUploadFormData = {
         file: file,
         userId: userData.id,
      };
      const formData = createPdfUploadFormData(data);

      try {
         const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
         );
         if (!token) {
            throw new Error("Failed to get token");
         }
         const textData = await uploadFileFTB(formData, token);
         toast({
            title: "File successfully uploaded.",
            status: "success",
            duration: 5000,
            isClosable: true,
         });
         setUploadSatus(UPLOAD_STATUS.SUCCESS)
         //console.log(textData);

      } catch (error) {
         const errorMessage = (error as AxiosError<ServerResponse<unknown>>)
            ?.response?.data?.message;
         toast({
            title: "An error occurred.",
            description: errorMessage || `Something went wrong with the file upload`,
            status: "error",
            duration: 5000,
            isClosable: true,
         });
         setUploadSatus(UPLOAD_STATUS.ERROR)
      } finally {
         void queryClient.invalidateQueries(["userKnowledge"]);
      }
   };

   return (
      <Stack
         minHeight="174px"
         gap={10}
      >
         <Stack justifyContent="space-between" alignItems={useBreakpointValue({ base: "center", md: "baseline" })} flexDirection={["column", "column", "row"]} color={colorMode == "dark" ? "white" : "black"}>

            <Stack display="flex" flexDirection="column">
               <Text textAlign={useBreakpointValue({ base: "center", md: "inherit" })} fontSize={useBreakpointValue({ base: '25px', md: '29.53px' })} lineHeight="30px" fontWeight="700" sx={{ color: titleColor }}>
                  {getUserDisplayedName()}
               </Text>
               <Text fontSize={useBreakpointValue({ base: '25px', md: '29.53px' })} fontWeight="700" sx={{ color: subTitleColor }} >
                  How may I assist you today?
               </Text>
            </Stack>

            <ButtonGroup spacing={0} gap={4} overflow={"auto"} maxWidth={"100%"}>
               <Button leftIcon={<NotificationIcon pathFill={useColorModeValue("black", "#999999")} />} flexShrink={0} colorScheme='gray' variant='outline' onClick={onOpenNotificationModal}>
                  Notifications
               </Button>
               <Button leftIcon={<RefIconComponent pathFill={useColorModeValue("black", "#999999")} />} flexShrink={0} colorScheme='gray' variant='outline' onClick={onFriendModalClose}>
                  Invite & Earn
               </Button>
               <Link to={"/support"}>
                  <Button leftIcon={<HelpIconComponent pathFill={useColorModeValue("black", "#999999")} />} flexShrink={0} colorScheme='gray' variant='outline'>Help</Button>
               </Link>
            </ButtonGroup>
         </Stack>

         <Flex gap={["10px", "10px", "20px"]} flexDirection={["column", "column", "row"]} overflow={"auto"}>
            <Stack>
               <Button {...btnStyle}
                  sx={
                     thirdPartyConfig?.userId ? activatedStyle : {}
                  } >
                  <Link to={{ pathname: '/knowledge-sources' }} state={{ activeTab: "account-connectors" }} >
                     Connect your accounts
                  </Link>
               </Button>
            </Stack>
            <FileUploadButton {...btnStyle} sx={userEntities?.length ? activatedStyle : {}} />
            <Stack>
               <Button {...btnStyle} onClick={handleQuestion}>Ask your first question</Button>
            </Stack>
            <Stack>
               <Button {...btnStyle}
                  sx={
                     userAgents?.length ? activatedStyle : {}
                  }
               >
                  <Link to={"/knowlee-processes/processes-store"}>
                     Add an AI Process
                  </Link>
               </Button>
            </Stack>
            <Stack>
               <Button {...btnStyle}
                  sx={
                     userProcessesList?.length ? activatedStyle : {}
                  }
               >
                  <Link to={"/knowlee-assistants/create-assistant"}>
                     Customize an assistant
                  </Link>
               </Button>
            </Stack>
            <Stack>
               <Button {...btnStyle}
                  sx={
                     thirdPartyConfig?.userId ? activatedStyle : {}
                  }
               >
                  <Link to={"/knowledge-sources"}>
                     Add your first app
                  </Link>
               </Button>
            </Stack>
         </Flex>
         <Stack
            direction="row"
            alignItems="center"
            mr={4}
            ml={4}

            sx={{
               border: "2px solid rgba(229, 230, 230, 1)",
               borderRadius: '12px',
               paddingLeft: "12px",
               marginBottom: 10,
               paddingRight: "12px"
            }}>
            <Box p={2} mx="1" onClick={() => onOpen()}>
               <AttachmentIcon style={{ cursor: "pointer" }} />
            </Box>
            <FileUploadModal onFileReceived={handleFileUpload} uploadStatus={uploadStatus} isOpen={isOpen} onClose={onClose} />
            <Input height={useBreakpointValue({ base: '50px', md: '64px' })} fontSize={useBreakpointValue({ base: '13px', md: '16px' })} variant="unstyled" placeholder="Start a conversation" ref={chatRef} onKeyDown={handleKeyDown} />
            <Button
               bg={"#4386F4"}
               _hover={{ bg: "#1166f1" }}
               color={"white"}
               size="sm"
               borderRadius={"8px"}
               p={1}
               onClick={handleChat}
               position="sticky"
            >
               <ArrowUpIcon fontSize={"md"} boxSize={"6"} style={{ cursor: "pointer" }} />
            </Button>
         </Stack>
         <InviteFriendsModal onClose={onFriendModalClose} isOpen={openFriendModal} />
         <NotificationModal
            isOpen={isOpenNotificationModal}
            onClose={onCloseNotificationModal}
         />

      </Stack>

   );
};

export default Banner;
