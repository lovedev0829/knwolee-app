import {
    Box,
    Button,
    Flex,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from "@chakra-ui/react";
import { TourItem } from "./WelcomeTourModal";

interface Props {
    handleNext: () => void;
    handlePrevious: () => void;
    onClose: () => void;
    tourData: TourItem;
    isLastStep?: boolean;
}

function TourBody({
    handleNext,
    handlePrevious,
    onClose,
    tourData,
    isLastStep = false,
}: Props) {
    const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
    const iframeHeight = useBreakpointValue(["200px", "300px"]);

    return (
        <Box>
            <Flex flexDirection="column" gap="12px">
                <Text color={headingTextColor} fontSize="31px" fontWeight="700">
                    {tourData.title}
                </Text>
                <iframe
                    height={iframeHeight}
                    width={"100%"}
                    src={tourData.iframeSrc}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
                <Text color="neutral.60" fontSize="13px" fontWeight="500">
                    {tourData.description}
                </Text>
            </Flex>
            <Flex justifyContent="center" gap="24px" marginTop="24px">
                <Button
                    fontWeight="500"
                    minWidth="144px"
                    onClick={handlePrevious}
                    color={headingTextColor}
                >
                    Previous
                </Button>
                <Button
                    fontWeight="500"
                    color="neutral.10"
                    bg="primary.50"
                    minWidth="144px"
                    variant="unstyled"
                    onClick={handleNext}
                >
                    {isLastStep ? "End" : "Next"}
                </Button>
            </Flex>
            {!isLastStep && (
                <Flex justifyContent="flex-end">
                    <Button
                        variant="unstyled"
                        color="headingTextColor"
                        fontSize="13px"
                        fontWeight="500"
                        onClick={onClose}
                    >
                        Skip Tour
                    </Button>
                </Flex>
            )}
        </Box>
    );
}

export default TourBody;
