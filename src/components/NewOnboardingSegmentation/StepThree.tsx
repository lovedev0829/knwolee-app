import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import StepIndicator from "./StepProgressionIndicator";
import DefaultProcesses from "src/pages/KnowleeProcesses/DefaultProcesses";
import { useUpdateProfileMutation } from "src/api/mutations/userIndex";

interface NewOnboardingSegmentationProps {
  isOpen: boolean;
  onClose: () => void;
  setIndexCurrentStep: (step: number) => void;
  currentStep: number;
}

const NewOnboardingSegmentationStep3: React.FC<NewOnboardingSegmentationProps> = ({
  isOpen,
  onClose,
  setIndexCurrentStep,
  currentStep
}) => {
  const updateProfileMutation = useUpdateProfileMutation();
  const { colorMode, setColorMode } = useColorMode();
  const modalOverlayBgColor = useColorModeValue(
    undefined,
    "rgba(35, 38, 39, 0.90)"
  );
  const modalContentBgColor = useColorModeValue(undefined, "neutral.100");
  const headingColor = useColorModeValue('#c1bdbd', '#ffffff40');

  const handleSkipAndComplete = () => {
    // update the isSegmentationCompleted flag to true
    const formData = new FormData();
    formData.append("isSegmentationCompleted", String(true));
    updateProfileMutation.mutate(formData);
    return;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"6xl"} isCentered={true} >
      <ModalOverlay bg={modalOverlayBgColor} />
      <ModalContent
        p="48px 40px 48px 40px "
        borderRadius="24px"
        backgroundColor={modalContentBgColor}
        boxSize="border-box"
        position={"relative"}
      >
        <ModalHeader position={"absolute"} top={"0"} right={"0"}>
          <StepIndicator currentStep={currentStep} setIndexCurrentStep={setIndexCurrentStep} />
        </ModalHeader>
        <SimpleGrid columns={[1, 1, 2]} spacing={10}>
          <Box p={4} borderRadius="md" display="flex" alignItems="center" justifyContent="center">
            <Image src="/images/Onboarding-step-3-image.png" alt="Connectors Message" />
          </Box>

          <Box
            p={5}
            maxW="500px"
            overflow="hidden"
          // boxShadow="md"
          >
            <Text fontSize="4xl" fontWeight={"bold"}>Automate Your Life</Text>
            <Text fontSize="4xl" mb="8px" fontWeight={"bold"} color={headingColor}>Start from a template</Text>
            <Box>
              <Flex
                className="scroll-hover"
                mt="24px"
                alignItems="flex-start"
                flexWrap="nowrap"
                maxHeight="180px"
                direction="row"
                wrap="nowrap"
                gap="12px"
                overflowX="auto"
              >
                <DefaultProcesses />
              </Flex>
            </Box>
            <Flex mt="24px" justifyContent="flex-end" gap="12px">
              <Button
                onClick={() => setIndexCurrentStep(currentStep - 1)}
                bg={colorMode === 'light' ? 'black' : 'transparent'}
                colorScheme={colorMode === 'light' ? 'black' : 'gray'}
                variant={colorMode === 'light' ? 'solid' : 'outline'}
                color={colorMode === 'light' ? 'white' : 'gray.300'}
              >
                Back
              </Button>
              <Button
                onClick={handleSkipAndComplete}
                colorScheme="blue"
                width={"full"}
              >
                Complete
              </Button>
            </Flex>
            <Flex mt="16px" justifyContent="flex-start" alignItems="flex-start">
              <Button
                variant="link"
                onClick={handleSkipAndComplete}
                colorScheme="blue"
              >
                Skip for now
              </Button>
            </Flex>
          </Box>
        </SimpleGrid>

      </ModalContent>
    </Modal>
  );
};

export default NewOnboardingSegmentationStep3;
