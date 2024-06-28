import React, { useState } from 'react';
import {
    Box, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button,
    useColorModeValue, useToast
} from "@chakra-ui/react";
import { IThreadMessage } from "../../../utils/types";
import MarkdownComponent from "src/components/common/Markdown/MarkdownComponent";
// import { useUpsertPineconeVectorMutation } from 'src/api/mutations/pineconeIndex';
// import styled from 'styled-components';
import { AudioBtn } from '../Panel';

type Props = {
    message: IThreadMessage;
};

// const COPY_BG_COLOR = "rgba(231, 239, 254, 0.50)";
// const EDIT_BG_COLOR = "#FFF4E5";
// const FONT_SIZE = 13;

// const CopyWrapper = styled.div<{ colorMode: ColorMode }>`
//   border-radius: 6px;
//   background: ${({ colorMode }) =>
//     colorMode === "dark" ? "#4A4D4F" : COPY_BG_COLOR};
//   display: flex;
//   flex-direction: row;
//   padding: 2px 8px;
//   align-items: center;
//   justify-content: center;
// `;

function MessageBox({ message }: Props) {

    //console.log("Original message content:", message.content);

    let textValue = message.content
        .map((content) => {
            const value = content?.text?.value || "";
            // Using regular expression to identify inline code and escape backticks
            // value = value.replace(/`([^`]*)`/g, (_, inlineCode) => {
            //     // Replace backticks within inline code with an alternative, e.g., single quotes
            //     return `'${inlineCode}'`;
            // });
            return value;
        })
        .join("\n");
    
    //console.log("Final text value:", textValue);
    const annotations = message.content[0]?.text?.annotations ? message.content[0]?.text?.annotations : [];
    const annotationTexts = annotations?.map((annotation) => annotation?.text);
    // remove annotation texts
    textValue = annotationTexts?.reduce((result, annotationText) => {
        return result.replace(annotationText, "");
    }, textValue);
    //console.log("", {textValue});
    const assistantMessageBG = useColorModeValue(
        "rgba(231, 239, 254, 0.50)",
        "neutral.100"
    );
    const otherMessageBG = useColorModeValue(
        "rgba(255, 244, 229, 0.5)",
        "rgba(52, 56, 57, 0.50)"
    );
    const actionTextColor = useColorModeValue("#4386f4", "#FEFEFE");
    const actionBackgroundColor = useColorModeValue(
        "rgba(231, 239, 254, 0.50)",
        "#4A4D4F"
    );
   
    const userActionTextColor = useColorModeValue("#FFAB3F", "#FEFEFE");
    const userActionBackgroundColor = useColorModeValue(
        "rgba(255, 244, 229, 1)",
        "#4A4D4F"
    );
    const textColor = useColorModeValue("neutral.100", "neutral.10");

    const toast = useToast();

    // State to track the currently selected annotation
    const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);

    // Function to open modal with specific annotation
    const openAnnotation = (annotation: string) => {
        setSelectedAnnotation(annotation);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedAnnotation(null);
    };
    // const upsertPineconeVectorMutation = useUpsertPineconeVectorMutation();

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



    // function renderSendToBrainButton() {
    //     if (
    //       message.metadata?.type === PANEL_OPTIONS.AUDIO ||
    //       message.metadata?.type === PANEL_OPTIONS.IMAGE ||
    //       message.metadata?.type === PANEL_OPTIONS.VIDEO ||
    //       message.role === "user"
    //     ) {
    //       return null;
    //     }
    
    //     return (
    //       <CopyWrapper colorMode={colorMode}>
    //         <Box cursor={"pointer"} onClick={handleSendToBrain}>
    //           Send to Brain
    //         </Box>
    //       </CopyWrapper>
    //     );
    //   }

    return (
        <Box my={1}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={message.role === "assistant" ? "flex-start" : "flex-end"}
            >
                <Box
                    bg={
                        message.role === "assistant" ? assistantMessageBG : otherMessageBG
                    }
                    textColor={textColor}
                    alignItems={"center"}
                    rounded={"2xl"}
                    px={3}
                    py={2}
                    my={1}
                    maxW={"67%"}
                >
                    <Box overflowX="auto" maxW="100%">
                        <MarkdownComponent>{textValue}</MarkdownComponent>
                    </Box>
                    {annotations.map((annotation, index) => {
                        const { type, text } = annotation;
                        let label = '';
                        if (type === "file_citation") {
                            label = annotation?.file_citation?.quote;
                        } else if (type === "file_path") {
                            label = annotation.file_path.file_id;
                        }
                        return (
                            <Button size="xs" key={index} onClick={() => openAnnotation(label)}>
                                {text}
                            </Button>
                        );
                    })}
                    {/* Modal for displaying the selected annotation */}
                    {selectedAnnotation && (
                        <Modal isOpen={selectedAnnotation !== null} onClose={closeModal}>
                            <ModalOverlay />
                            <ModalContent sx={{ borderRadius:'16px', overflowY: 'auto'}}>
                                <ModalHeader>References</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <MarkdownComponent>{selectedAnnotation}</MarkdownComponent>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    )}

                    <Flex
                        alignItems="flex-end"
                        alignSelf="stretch"
                        color={actionTextColor}
                        flexDirection="column"
                        fontSize="13px"
                        justifyContent="flex-start"
                        marginTop="20px"
                    >
                        <Flex
                            alignItems="center"
                            flexWrap="wrap"
                            gap="12px"
                            justifyContent="center"
                        >
                            <Flex
                                alignItems="center"
                                background={message.role === "assistant" ? actionBackgroundColor : userActionBackgroundColor}
                                color={message.role === "assistant" ? actionTextColor : userActionTextColor }
                                borderRadius="6px"
                                cursor="pointer"
                                justifyContent="center"
                                lineHeight="20px"
                                onClick={() => copyToClipboard(textValue)}
                                padding="2px 8px"
                                >
                                Copy
                            </Flex>
                            {(textValue && message.role === "assistant")  &&
                            <Flex
                                alignItems="center"
                                background={message.role === "assistant" ? actionBackgroundColor : userActionBackgroundColor}
                                color={message.role === "assistant" ? actionTextColor : userActionTextColor }
                                borderRadius="6px"
                                cursor="pointer"
                                justifyContent="center"
                                lineHeight="20px"
                                padding="2px 8px"
                                >
                              <AudioBtn key={message.id} text={textValue} />
                            </Flex>}

                            {/* {renderSendToBrainButton()} */}
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}

export default MessageBox;

