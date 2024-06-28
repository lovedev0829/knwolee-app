import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import KnowleeLogoBig from "src/Icons/KnowleeLogoBig";

interface Props {
    onClose: () => void;
    handleNext: () => void;
}

function WelcomeBody({ onClose, handleNext }: Props) {
    const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
    return (
        <Box>
            <Flex gap="48px" justifyContent="space-between">
                <Box>
                    <Text color={headingTextColor} fontSize="31px" fontWeight="700">
                        Welcome to Knowlee!
                    </Text>
                    <Text color="neutral.60" fontSize="13px" fontWeight="500">
                        Let's show you around! We'll have you up and running shortly.
                    </Text>
                </Box>
                <Box>
                    <KnowleeLogoBig />
                </Box>
            </Flex>
            <Flex justifyContent="center" gap="24px">
                <Button
                    fontWeight="500"
                    color="neutral.10"
                    bg="primary.50"
                    minWidth="144px"
                    variant="unstyled"
                    onClick={handleNext}
                >
                    Get Started
                </Button>
                <Button
                    onClick={onClose}
                    fontWeight="500"
                    minWidth="144px"
                    color={headingTextColor}
                >
                    Show me later
                </Button>
            </Flex>
        </Box>
    );
}

export default WelcomeBody;
