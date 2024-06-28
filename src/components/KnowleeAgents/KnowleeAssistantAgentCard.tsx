
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import KnowleeLogo from "src/Icons/KnowleeLogoAgents";
import LogIn04AltIcon from "src/Icons/knowlee-agents/LogIn04AltIcon";
import { PANEL_OPTIONS } from "src/types/panel";


function KnowleeAssistantAgentCard() {
    const navigate = useNavigate();

    const borderColor = useColorModeValue("neutral.20", "neutral.05100");
    const buttonBorderColor = useColorModeValue("neutral.30", "neutral.05100");
    const buttonBackground = useColorModeValue("secondary.30", "secondary.70");
    const buttonHoverBg = useColorModeValue("primary.20", "primary.60");
    const buttonActiveBg = useColorModeValue("primary.70", "primary.90");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const pathFillColor = useColorModeValue("#0C0D0D", "#FEFEFE");
  
    function handleRunClick() {
        navigate("/knowleechats");
    }

    return (
        <Box
            display="flex"
            width={["full", "calc(50% - 8px)", "300px", "242px"]}
            padding="20px 24px"
            flexDirection="column"
            justifyContent="center"
            alignItems="flexStart"
            gap="20px"
            borderRadius="12px"
            border="1px solid"
            borderColor={borderColor}
        >
            <Flex
                alignItems="center"
                gap="16px"
                justifyContent="space-between"
            >
                <Box
                    w="60px"
                    h="60px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                    bg="neutral.20"
                >
                    <KnowleeLogo />
                </Box>
                <Button
                    display="flex"
                    padding="12px 24px"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="10px"
                    border="2px solid"
                    borderColor={buttonBorderColor}
                    bg={buttonBackground}
                    color={textColor}
                    leftIcon={<LogIn04AltIcon pathFill={pathFillColor} />}
                    fontSize="16px"
                    fontWeight="500"
                    onClick={handleRunClick}
                    _hover={{
                        bg: buttonHoverBg,
                        transform: "translateY(-2px)", // Slight lift effect
                        boxShadow: "md", // Medium shadow for depth
                      }}
                      _active={{
                        bg: buttonActiveBg,
                        transform: "translateY(0)", // Reset position
                      }}
                      _focus={{
                        boxShadow: "outline", // Use the theme's outline style for focus
                      }}
                    >
                                    Run
                </Button>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
                <Box color={textColor}>
                    <Text
                        fontWeight="500"
                        fontSize="16px"
                        lineHeight="26px"
                    >
                        Knowlee Assistant
                    </Text>
                    <Text
                        fontWeight="500"
                        fontSize="12px"
                        lineHeight="18px"
                    >
                        The All-in-One AI made with ❤️
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default KnowleeAssistantAgentCard;
