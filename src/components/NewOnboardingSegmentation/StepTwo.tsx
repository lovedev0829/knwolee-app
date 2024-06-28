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
import { useState } from "react";
import StepIndicator from "./StepProgressionIndicator";
import GoogleAuth from "./OnBoardingAuthButtons/GoogleAuth";
import MicrosoftAuth from "./OnBoardingAuthButtons/MicrosoftAuth";
import LinkedInAuth from "./OnBoardingAuthButtons/LinkedinAuth";
import TwitterAuth from "./OnBoardingAuthButtons/TwitterAuth";
import MediumAuth from "./OnBoardingAuthButtons/MediumAuth";
import SlackAuth from "./OnBoardingAuthButtons/SlackAuth";
import TrelloAuth from "./OnBoardingAuthButtons/TrelloAuth";
import NotionAuth from "./OnBoardingAuthButtons/NotionAuth";
import GoogleDisclosureModal from "./GoogleDisclosure";
import { useUpdateProfileMutation } from "src/api/mutations/userIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

interface NewOnboardingSegmentationProps {
    isOpen: boolean;
    onClose: () => void;
    setIndexCurrentStep: (step: number) => void;
    currentStep: number;
}

const NewOnboardingSegmentationStep2: React.FC<NewOnboardingSegmentationProps> = ({
    isOpen,
    onClose,
    setIndexCurrentStep,
    currentStep
}) => {
    const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
    const updateProfileMutation = useUpdateProfileMutation();
    const { colorMode, setColorMode } = useColorMode();
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );
    const { data: thirdPartyConfig } = useThirdPartyConfig();
    const modalContentBgColor = useColorModeValue(undefined, "neutral.100");
    const headingColor = useColorModeValue('#c1bdbd', '#ffffff40');

    const openGoogleModal = () => {
        setIsGoogleModalOpen(true);
    };

    const closeGoogleModal = () => {
        setIsGoogleModalOpen(false);
    };

    const handleSkip = () => {
        // update the isSegmentationCompleted flag to true
        const formData = new FormData();
        formData.append("isSegmentationCompleted", String(true));
        updateProfileMutation.mutate(formData);
        return;
    }

    const connectContinue = () => {
        setIndexCurrentStep(currentStep + 1);

        // update username and onboarding step
        const formData = new FormData();
        formData.append("onboardingStep", "3");

        updateProfileMutation.mutate(formData);
    }

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} size={"6xl"} isCentered={true}>
          <ModalOverlay bg={modalOverlayBgColor} />
          <ModalContent
            p="48px 40px 48px 40px "
            borderRadius="24px"
            backgroundColor={modalContentBgColor}
            boxSize="border-box"
          >
            <ModalHeader position={"absolute"} top={"0"} right={"0"}>
              <StepIndicator
                currentStep={currentStep}
                setIndexCurrentStep={setIndexCurrentStep}
              />
            </ModalHeader>

            <SimpleGrid columns={[1, 1, 2]} spacing={10}>
              <Box
                p={4}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/images/Onboarding-step-2-image.png"
                  alt="Connectors Message"
                />
              </Box>

              <Box
                p={5}
                maxW="500px"
                overflow="hidden"
                // boxShadow="md"
              >
                <Text fontSize="4xl" fontWeight={"bold"}>
                  Connect your accounts
                </Text>
                <Text
                  fontSize="4xl"
                  fontWeight={"bold"}
                  mb="6px"
                  color={headingColor}
                >
                  and let Knowlee help
                </Text>
                <Flex
                  className="overflow-auto"
                  mt="24px"
                  maxHeight="160px"
                  gap="10px"
                  overflowY="auto"
                  flexDirection={"column"}
                  width={"full"}
                  padding={"0 8px 0 0"}
                >
                  <GoogleAuth />
                  <MicrosoftAuth />
                  <LinkedInAuth />
                  <TwitterAuth />
                  <MediumAuth />
                  <SlackAuth />
                  <TrelloAuth />
                  <NotionAuth />
                </Flex>

                {/* <Flex
                  mt="16px"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Button
                    variant="link"
                    onClick={openGoogleModal}
                    colorScheme="blue"
                  >
                    View disclaimer
                  </Button>
                </Flex> */}

                <Flex mt="44px" justifyContent="flex-end" gap="12px">
                  <Button
                    onClick={() => setIndexCurrentStep(currentStep - 1)}
                    bg={colorMode === "light" ? "black" : "transparent"}
                    colorScheme={colorMode === "light" ? "black" : "gray"}
                    variant={colorMode === "light" ? "solid" : "outline"}
                    color={colorMode === "light" ? "white" : "gray.300"}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={connectContinue}
                    colorScheme="blue"
                    width={"full"}
                    isDisabled={
                      (thirdPartyConfig?.google?.token?.access_token ||
                      thirdPartyConfig?.microsoft?.token?.access_token ||
                      thirdPartyConfig?.linkedin?.token?.access_token ||
                      thirdPartyConfig?.twitter?.token?.access_token ||
                      thirdPartyConfig?.medium?.token?.access_token ||
                      thirdPartyConfig?.slack?.token?.access_token ||
                      thirdPartyConfig?.trello?.token?.access_token ||
                      thirdPartyConfig?.notion?.token?.access_token)
                        ? false
                        : true
                    }
                  >
                    Connect an account to continue
                  </Button>
                </Flex>

                <Flex
                  mt="16px"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Button
                    variant="link"
                    onClick={handleSkip}
                    colorScheme="blue"
                  >
                    Skip for now
                  </Button>
                </Flex>
              </Box>
            </SimpleGrid>
          </ModalContent>
        </Modal>
        {/* <GoogleDisclosureModal
          isOpen={isGoogleModalOpen}
          onClose={closeGoogleModal}
        /> */}
      </>
    );
};

export default NewOnboardingSegmentationStep2;
