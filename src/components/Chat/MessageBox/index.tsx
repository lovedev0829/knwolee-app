import {
  Box,
  ColorMode,
  Flex,
  Image,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { FC } from "react";
import styled from "styled-components";
import { Message } from "../../../utils/types";
import { AudioBtn } from "../Panel";
import ChatDocumentIcon from "../../../Icons/ChatDocumentIcon";
import { PANEL_OPTIONS } from "../../../types/panel";
import { IQueryQuestion } from "src/types/queryQuestion.interface";
import { RegenerateResponsePayload } from "src/api/requests/queryIndex";
import EnlargeImageModal from "src/components/Modal/EnlargeImageModal";
import { useUpsertPineconeVectorMutation } from "src/api/mutations/pineconeIndex";
import ChatImageWithPreview from "../ChatImageWithPreview";

const COPY_BG_COLOR = "rgba(231, 239, 254, 0.50)";
const EDIT_BG_COLOR = "#FFF4E5";
const FONT_SIZE = 13;

const Copy = styled.div`
  position: relative;
  line-height: 20px;
  cursor: pointer;
`;
const CopyWrapper = styled.div<{ colorMode: ColorMode }>`
  border-radius: 6px;
  background: ${({ colorMode }) =>
    colorMode === "dark" ? "#4A4D4F" : COPY_BG_COLOR};
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  align-items: center;
  justify-content: center;
`;
const Edit = styled.div`
  position: relative;
  line-height: 20px;
`;
const EditWrapper = styled.div<{ colorMode: ColorMode }>`
  border-radius: 6px;
  background: ${({ colorMode }) =>
    colorMode === "dark" ? "#4A4D4F" : EDIT_BG_COLOR};
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  align-items: center;
  justify-content: center;
  color: ${({ colorMode }) => (colorMode === "dark" ? "#FEFEFE" : "#FFAB3F")};
`;
const FrameParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
`;

const AiActionButtonson1 = styled.div<{ colorMode?: ColorMode }>`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: ${FONT_SIZE}px;
  color: ${({ colorMode }) => (colorMode === "dark" ? "#FEFEFE" : "#4386f4")};
  margin-top: 20px;
`;

type MessageBoxProps = {
  message: Message;
  handleRegenerateResponse?: (data: RegenerateResponsePayload) => Promise<IQueryQuestion | null>;
};

const MessageBox: FC<MessageBoxProps> = ({ message, handleRegenerateResponse }) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const { isOpen: isOpenEnlargeImage, onOpen: onOpenEnlargeImage, onClose: onCloseEnlargeImage } = useDisclosure();

  const upsertPineconeVectorMutation = useUpsertPineconeVectorMutation();

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);

    // Show success toast
    toast({
      title: "Copied successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  function handleSendToBrain() {
    upsertPineconeVectorMutation.mutate({ embedText: message.content });
  }

  function renderSendToBrainButton() {
    if (
      message.metaData?.type === PANEL_OPTIONS.AUDIO ||
      message.metaData?.type === PANEL_OPTIONS.IMAGE ||
      message.metaData?.type === PANEL_OPTIONS.VIDEO
    ) {
      return null;
    }

    return (
      <CopyWrapper colorMode={colorMode}>
        <Box cursor={"pointer"} onClick={handleSendToBrain}>
          Send to Brain
        </Box>
      </CopyWrapper>
    );
  }

  return (
    <Box my={1} w="full">
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={message.role === "assistant" ? "flex-start" : "flex-end"}
      >
        <Box
          bg={
            message.role === "assistant"
              ? colorMode === "dark"
                ? "neutral.100"
                : "rgba(231, 239, 254, 0.50)"
              : colorMode === "dark"
                ? "rgba(52, 56, 57, 0.50)"
                : "rgba(255, 244, 229, 0.5)"
          }
          textColor={colorMode === "dark" ? "neutral.10" : "black"}
          alignItems={"center"}
          rounded={"2xl"}
          px={3}
          py={2}
          my={1}
          maxW={"67%"}
          whiteSpace={"pre-wrap"}
          overflowWrap={"anywhere"}
        >
          {message.role === "user" &&
            message.metaData?.type === PANEL_OPTIONS.DOCUMENT &&
            message.metaData?.data && (
              <Flex w="100%" p="16px" paddingLeft={0} alignItems="center">
                <ChatDocumentIcon />
                <Text
                  ml="16px"
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="24px"
                >
                  {message.metaData?.data}
                </Text>
              </Flex>
            )}

          {message.role === "user" && message?.metaData?.type === "image-interpreter" && (
            <Box pb="1" pt="6">
              {Array.isArray(message?.metaData?.data) ? (
                message?.metaData?.data.map((_image: string, _index) => (
                  <ChatImageWithPreview key={_index} alt={`Knowlee AI Image ${_index}`} src={_image} />
                ))
              ) : (
                <ChatImageWithPreview alt="Knowlee AI Image" src={message.metaData.data} />
              )}
            </Box>
          )}

          {!!message.content && message.content}

          {message.metaData?.type === "audio" && (
            <audio controls>
              <source src={message.metaData.data} type="audio/mpeg" />
              Your browser does not support audio element.
            </audio>
          )}

          {message.metaData?.type === "image" && (
            <Box pt="6" pb="1">
              <Image
                width="full"
                height="auto"
                maxWidth="250px"
                src={message.metaData.data}
                alt="Knowlee AI Image"
                borderRadius="12px"
                cursor="pointer"
                onClick={() => {
                  onOpenEnlargeImage();
                }}
              />
              <EnlargeImageModal
                isOpen={isOpenEnlargeImage}
                onClose={onCloseEnlargeImage}
                src={message.metaData.data}
              />
            </Box>
          )}

          {message.metaData?.type === "video" && (
            <div>
              <video autoPlay controls src={message.metaData.data} width={250} height={250}></video>
            </div>
          )}

          {message.role === "assistant" ? (
            <AiActionButtonson1 colorMode={colorMode}>
              <FrameParent>
                <CopyWrapper colorMode={colorMode}>
                  <Copy onClick={() => copyToClipboard(message.content)}>
                    Copy
                  </Copy>
                </CopyWrapper>
                <CopyWrapper colorMode={colorMode}>
                  <Copy
                    onClick={() => {
                      if (!message._id) {
                        console.error("message id is required", message);
                        return;
                      }
                      if (!message.metaData?.type && handleRegenerateResponse) {
                        handleRegenerateResponse({
                          content: message.content,
                          queryQuestionId: message._id,
                        });
                      }
                    }}
                  >
                    Regenerate response
                  </Copy>
                </CopyWrapper>

                {!message.metaData && (
                  <CopyWrapper colorMode={colorMode}>
                    <AudioBtn text={message.content} />
                  </CopyWrapper>
                )}

                {message.metaData?.type === "audio" && (
                  <CopyWrapper colorMode={colorMode}>
                    <a href={message.metaData.data}>Download audio</a>
                  </CopyWrapper>
                )}
                {renderSendToBrainButton()}
              </FrameParent>
            </AiActionButtonson1>
          ) : (
            <AiActionButtonson1>
              <FrameParent>
                <EditWrapper colorMode={colorMode}>
                  <Edit>Edit</Edit>
                </EditWrapper>
              </FrameParent>
            </AiActionButtonson1>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBox;
