import { Message } from '../../utils/types'
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Text, Textarea, useColorModeValue } from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'
import { ConfigOptions, PANEL_OPTIONS, PanelOptionType } from 'src/types/panel'
import AudioRecordingButton from './AudioRecordingButton'
import { useOpenAIAudioTranscriptionMutation } from 'src/api/mutations/openAIMutation'

const initialConfigOptions: ConfigOptions = {
  negative_prompt: ""
}

interface Props {
  onSend: (message: Message, configOptions: ConfigOptions) => void
  disabled: boolean
  panelOption?: PanelOptionType | null
  errorMessage?: string;
}

export const ChatInput: FC<Props> = ({ onSend, disabled, panelOption, errorMessage }) => {

  const isTextToImage = panelOption === PANEL_OPTIONS.IMAGE;

  const borderColor = useColorModeValue("neutral.30", "neutral.80");
  const bgColor = useColorModeValue(undefined, "neutral.90");

  const [content, setContent] = useState<string>()
  const [textareaHeight, setTextareaHeight] = useState<string>();
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [configOptions, setConfigOptions] = useState(initialConfigOptions)

  const transcriptionMutation = useOpenAIAudioTranscriptionMutation();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length > 12000) {
      alert('Message limit is 12000 characters')
      return
    }

    setContent(value)
  }

  const handleSend = () => {
    if (!content?.trim()) {
      alert('Please enter a message')
      return
    }

    // reset transcription mutation of speech to text
    transcriptionMutation.reset();

    onSend({ role: 'user', content: content.trim() }, configOptions)
    setConfigOptions(initialConfigOptions)
    setContent('')
    setTextareaHeight("44px")
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleConfigOptionChange = (key: keyof ConfigOptions, value: string) => {
    setConfigOptions(prev => ({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (transcriptionMutation.data) {
      setContent(transcriptionMutation.data.text);
    }
  }, [setContent, transcriptionMutation.data]);

  return (
    <>
    <Box
      // display={'flex'}
      // flexDirection={'row'}
      // alignItems={'center'}
      // gap={"12px"}
      backgroundColor={bgColor}
      border={'2px'}
      borderColor={borderColor}
      borderRadius={'12px'}
    >
      {isTextToImage && (
        <Box p={3}>
          <Box
            className="scroll-hover"
            pl={4}
            maxHeight={"32"}
            overflow={"auto"}
          >
            <Textarea
              border="none"
              disabled={disabled}
              focusBorderColor="transparent"
              minHeight={"auto"}
              onChange={(e) =>
                handleConfigOptionChange("negative_prompt", e.target.value)
              }
              outline="none"
              p={0}
              placeholder="Type the negative prompt here..."
              resize="none"
              value={configOptions.negative_prompt}
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
        borderTop="1px solid"
        borderTopColor={isTextToImage ? borderColor : "transparent"}
      >
        <Textarea
          height="44px"
          ref={textareaRef}
          py={0}
          border="none"
          outline="none"
          width="full"
          resize="none"
          placeholder="Type the prompt here..."
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
          {panelOption === PANEL_OPTIONS.SPEECHTOTEXT &&
            !transcriptionMutation.data?.text ? (
            <AudioRecordingButton
              transcriptionMutation={transcriptionMutation}
            />
          ) : (
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
          )}
        </Flex>
      </Flex>
    </Box>
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
