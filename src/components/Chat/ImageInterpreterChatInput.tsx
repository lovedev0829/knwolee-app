
import { KeyboardEvent, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowUpIcon, AttachmentIcon } from "@chakra-ui/icons";
import { ConfigOptions, MetaDataWithType, PANEL_OPTIONS, PanelOptionType } from "src/types/panel";
import { Message } from "src/utils/types";
import { convertFileToBase64 } from "src/utils/file.upload";
import ChatFileUpload from "./FileUpload";
import ChatDocumentIcon from "src/Icons/ChatDocumentIcon";
import SmallTrashIcon from "src/Icons/SmallTrashIcon";

const initialConfigOptions: ConfigOptions = {
  negative_prompt: "",
  image_url: "",
  images: null,
};

interface Props {
  disabled: boolean;
  errorMessage?: string;
  onSend: (message: Message, configOptions: ConfigOptions) => void;
  panelOption?: PanelOptionType | null
}

function ImageInterpreterChatInput({ onSend, disabled, errorMessage }: Props) {
  const borderColor = useColorModeValue("neutral.30", "neutral.80");
  const bgColor = useColorModeValue(undefined, "neutral.90");

  const [content, setContent] = useState<string>();
  const [textareaHeight, setTextareaHeight] = useState<string>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [configOptions, setConfigOptions] = useState(initialConfigOptions);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 12000) {
      alert("Message limit is 12000 characters");
      return;
    }

    setContent(value);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  const createPayload = async (fileList: FileList) => {
    const base64Images: string[] = [];
    for await (const imageFile of fileList) {
      const base64 = await convertFileToBase64(imageFile)
      base64Images.push(base64 as string)
    }
    return base64Images
  }
  
  const handleSend = async () => {
    if (!content?.trim()) {
      alert("Please enter a message");
      return;
    }
    
    let images: string[] = [] 
    let message: Message; 
    if(configOptions.images && (configOptions?.images)?.length) {
      images = await createPayload(configOptions.images) 
      message = {
        role: "user",
        content: content.trim(),
        metaData: {
          type: PANEL_OPTIONS.IMAGE_INTERPRETER,
          data: images,
        } as MetaDataWithType<"image-interpreter">,
      }
    } else {
      message = {
        role: "user",
        content: content.trim(),
        metaData: {
          type: PANEL_OPTIONS.IMAGE_INTERPRETER,
          data: configOptions?.image_url || "",
        },
      }
    }

    onSend(
      message,
      configOptions,
    );
    setConfigOptions(initialConfigOptions);
    setContent("");
    setTextareaHeight("44px");
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleConfigOptionChange = (
    key: keyof ConfigOptions,
    value: string
  ) => {
    setConfigOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeFile = (fileToRemove: File) => {
    const { images: selectedFiles } = configOptions as { images: FileList }
    if(!selectedFiles) return;
    const fileArr = Array.from(selectedFiles)
    const dataTransfer = new DataTransfer();
    fileArr.forEach(file => {
      if(file !== fileToRemove) {
        dataTransfer.items.add(file);
      }
    })

    setConfigOptions((_) => ({... _, images: dataTransfer.files }))
  };

  return (
    <>
      <Box
        backgroundColor={bgColor}
        border={"2px"}
        borderColor={borderColor}
        borderRadius={"12px"}
      >

      {(configOptions.images && !!(configOptions?.images as { length: number})?.length) ? (
       Array.from(configOptions?.images)?.map((file) => (
        <Flex
          w="100%"
          p="16px"
          borderBottom="2px solid"
          borderColor="neutral.30"
          alignItems="center"
        >
          <ChatDocumentIcon />
          <Text ml="16px" fontSize="16px" fontWeight="500" lineHeight="24px">
            {file.name}
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
            onClick={() => removeFile(file)}
          >
            <SmallTrashIcon />
          </Button>
        </Flex>
       ))
      ): null}

        <Box p={3}>
          <Box
            className="scroll-hover"
            pl={4}
            maxHeight={"32"}
            overflow={"auto"}
          >
            <Textarea
              name="image_url"
              border="none"
              disabled={disabled}
              focusBorderColor="transparent"
              minHeight={"auto"}
              onChange={(e) =>
                handleConfigOptionChange("image_url", e.target.value)
              }
              outline="none"
              p={0}
              placeholder="Type the URL here..."
              resize="none"
              value={configOptions.image_url}
              width="full"
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                // Reset and set height
                target.style.height = "100%";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </Box>
        </Box>
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
          borderTop="1px solid"
          borderTopColor={borderColor}
        >
          <Textarea
            height="44px"
            ref={textareaRef}
            py={0}
            border="none"
            outline="none"
            width="full"
            resize="none"
            placeholder="Type the question here..."
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

          <ChatFileUpload 
            multiple
            isDisabled={disabled} 
            inputRef={inputRef} 
            onChange={(pickedImages) => setConfigOptions((prev) => ({...prev, images: pickedImages}))}>
            <Button p={2} mx="1">
              <AttachmentIcon />
            </Button>
          </ChatFileUpload>
          <Flex
            alignItems="flex-end"
            justifyContent="flex-end"
            flexDir="column"
            minH="40px"
            height={textareaHeight}
          >
            <Button
              bg={"#4386F4"}
              _hover={{ bg: "#1166f1" }}
              color={"white"}
              borderRadius={"12px"}
              p={2}
              onClick={handleSend}
              isDisabled={disabled}
            >
              <ArrowUpIcon fontSize={"md"} boxSize={"6"} />
            </Button>
          </Flex>
        </Flex>
      </Box>
      {errorMessage && (
        <Box>
          <Text color={"red.500"}>{errorMessage}</Text>
        </Box>
      )}
    </>
  );
}

export default ImageInterpreterChatInput;
