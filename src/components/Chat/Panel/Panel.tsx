import SpeechToTextIcon from '/images/chat-icons/speech-to-text.svg'
import TextAudioIcon from '/images/chat-icons/text-audio.svg'
import TextImageIcon from '/images/chat-icons/text-image.svg'
import TextPdfIcon from '/images/chat-icons/text-pdf.svg'
import TextVideoIcon from '/images/chat-icons/text-video.svg'
import { PANEL_OPTIONS, PanelOptionType } from "src/types/panel";
import { ArrowIcon } from "src/Icons/ArrowIcon";
import {
  Box,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Img,
  SimpleGrid,
  Text,
  useColorModeValue,
  Tooltip
} from "@chakra-ui/react";
import { InfoIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";

const panelData = [
/*  {
    option: PANEL_OPTIONS.DOCUMENT,
    color: "#3fdd78",
    title: "Docs Chat",
    description: `Upload your PDF and ask something`,
    image: TextPdfIcon,
},*/
    {
      option: PANEL_OPTIONS.IMAGE_INTERPRETER,
      color: "#ffbc66",
      title: "Image Interpreter",
      description: "gpt-4-vision-preview",
      image: TextImageIcon
    },
    {
    option: PANEL_OPTIONS.IMAGE,
    color: "#ffab3f",
    title: "Text to image",
    description: `Generate your image from simple prompt`,
    image: TextImageIcon
  },
  {
    option: PANEL_OPTIONS.AUDIO,
    color: "#8e55ea",
    title: "Text to audio",
    description: `Generate your voice from simple prompt`,
    image: TextAudioIcon
  },
  {
    option: PANEL_OPTIONS.VIDEO,
    color: "#4386f4",
    title: "Text to video",
    description: "Generate your video from simple prompt",
    image: TextVideoIcon
  },
  {
    option: PANEL_OPTIONS.SPEECHTOTEXT,
    color: "#4386f4",
    title: "Speech to text",
    description: "Generate your text from audio",
    image: SpeechToTextIcon
  },
]

interface PanelProps {
  option: string | null;
  setOption: Dispatch<SetStateAction<PanelOptionType | null>>;
  onToggle?: () => void;
  isOpen?: boolean; 
}

export const Panel = ({ option, setOption, onToggle, isOpen = false }: PanelProps) => {
  const bgColor = useColorModeValue("rgba(242, 242, 243, 0.60)", "rgba(52, 56, 57, 0.50)");
  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const borderColor = useColorModeValue("neutral.30", "neutral.70");

  return (
    <Box
      p={2.5}
      borderRadius="md"
      bg={bgColor}
      color={headingTextColor}
      fontFamily="Roboto"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading fontSize="18px" fontWeight="500">
          Unlock the power of AI
        </Heading>
        <IconButton
          aria-label="Toggle Panel"
          bg="none"
          border="none"
          _hover={{ bg: "none", boxShadow: "none" }}
          _active={{ bg: "none", boxShadow: "none" }}
          _focus={{ boxShadow: "none" }}
          onClick={onToggle}
          icon={isOpen ? <ChevronDownIcon boxSize="24px" /> : <ChevronRightIcon boxSize="24px" />}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Text
          fontSize="15px"
          opacity={0.7}
          fontWeight="500"
          mt={1}
          mb={2}
        >
          ✍️ Type to chat or 🚀 pick a feature below to experience next-level AI capabilities.
        </Text>
        <SimpleGrid columns={[1, 1, 2, 5]} spacing={2}>
          {panelData.map((data) => (
            <Flex
              key={data.title}
              border="1px solid"
              borderColor={borderColor}
              p={1}
              borderRadius="md"
              cursor="pointer"
              bg={
                option === data.option ? "rgba(220, 220, 221, 0.6)" : undefined
              }
              onClick={() => setOption(data.option)}
              alignItems="center"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                color={data.color}
                width="full"
              >
                <Flex gap={2}>
                  <Img
                    src={data["image"]}
                    alt={`icon-${data.option}`}
                    maxHeight={6}
                    maxWidth={6}
                  />
                  <Text fontWeight="600" fontSize="14px">
                    {data.title}
                  </Text>
                </Flex>
                <ArrowIcon color={data.color} />
              </Flex>
              {/*<Text color="#6C7275" fontSize="13px" maxWidth="180px" mt="8px">
                {data.description}
            </Text>*/}
            </Flex>
          ))}
        </SimpleGrid>
      </Collapse>
    </Box>
  );
};