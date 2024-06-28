import { Button, Box, Flex, Text, Textarea, useColorMode } from "@chakra-ui/react";
import { ArrowUpIcon } from '@chakra-ui/icons'
import { FC, KeyboardEvent, useRef, useState } from "react";
import AddIcon from "../../../Icons/AddIcon";
import ChatDocumentIcon from "../../../Icons/ChatDocumentIcon";
import SmallTrashIcon from "../../../Icons/SmallTrashIcon";
import { useUserData } from "../../../api/queries";
import { Message } from "../../../utils/types";
import ChatFileUpload from "./";

interface PdfChatInputProps {
  onSend: (message: Message, files: FileList | null) => void;
  disabled: boolean;
  errorMessage?: string;
}

export const PdfChatInput: FC<PdfChatInputProps> = ({ onSend, disabled, errorMessage }) => {
  const { colorMode } = useColorMode();
  const [content, setContent] = useState<string>();
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [textareaHeight, setTextareaHeight] = useState<string>();

  const { data: userData } = useUserData();
  const inputRef = useRef<HTMLInputElement | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert("Message limit is 4000 characters");
      return;
    }
    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert("Please enter a message");
      return;
    }
    onSend({ role: "user", content }, files || null);
    setContent("");
    removeFile();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (files: FileList) => {
    if (!userData || !files[0]) return;
    setFileName(files[0].name);
    setFiles(files);
  };

  const removeFile = () => {
    setFileName("");
    setFiles(null);
    if (inputRef.current) {
      inputRef.current.value = "";  // reset the file input
    }
  };

  return (
    <>
    <Flex
      display={'flex'}
      flexDir="column"
      alignItems={'center'}
      borderRadius={'12px'}
      border={'2px'}
      borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
      gap={"12px"}
      backgroundColor={colorMode === "dark" ? "neutral.90" : undefined}
    >
      {!!fileName && (
        <Flex
          w="100%"
          p="16px"
          borderBottom="2px solid"
          borderColor="neutral.30"
          alignItems="center"
        >
          <ChatDocumentIcon />
          <Text ml="16px" fontSize="16px" fontWeight="500" lineHeight="24px">
            {fileName}
          </Text>
          <Button
            w="32px"
            h="32px"
            p="8px"
            boxSize="border-box"
            bg="none"
            _hover={{ bg: "none", color: "delete.100" }}
            display="flex"
            alignItems="center"
            color="delete.50"
            onClick={removeFile}
          >
            <SmallTrashIcon />
          </Button>
        </Flex>
      )}

      <Flex
        className="scroll-hover"
        w="100%"
        flexDirection="row"
        alignItems="center"
        p="12px"
        height={"auto"}
        maxH="200px"
        minH="64px"
        overflowY="auto"
      >
          <ChatFileUpload
            onChange={handleFileChange}
            inputRef={inputRef}
            isDisabled={disabled}
          >
          <AddIcon />
        </ChatFileUpload>
        <Textarea
          height="44px"
          py={0}
          border="none"
          outline="none"
          width="full"
          resize="none"
          placeholder="Type a message..."
          focusBorderColor="transparent"
          h="100%"
          rows={1}
          disabled={disabled}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            // Reset and set height
            target.style.height = "100%";
            target.style.height = `${target.scrollHeight}px`;
            setTextareaHeight(`${target.scrollHeight}px`);
          }}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <Flex
          alignItems="flex-end"
          justifyContent="flex-end"
          flexDir="column"
          minH="40px"
          height={textareaHeight}
        >
          <Button
            bg={'#4386F4'}
            _hover={{ bg: '#1166f1' }}
            color={'white'}
            borderRadius={'12px'}
            p={2}
            onClick={handleSend}
              isDisabled={disabled}
          >
            <ArrowUpIcon fontSize={'md'} boxSize={'6'} />
          </Button>
        </Flex>
      </Flex>
    </Flex>
      {errorMessage &&
        <Box>
          <Text color={"red.500"}>
            {errorMessage}
          </Text>
        </Box>
      }
    </>
  );
};
