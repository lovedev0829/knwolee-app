import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import KnowleeLogo from "src/Icons/KnowleeLogoAgents";
import LogIn04AltIcon from "src/Icons/knowlee-agents/LogIn04AltIcon";

function ContentCreatorAgentCard() {
    const navigate = useNavigate();

    const textColor = useColorModeValue("neutral.90", "neutral.10");
    const borderColor = useColorModeValue("neutral.20", "neutral.05100");
    const buttonBorderColor = useColorModeValue("neutral.30", "neutral.05100");
    const pathFillColor = useColorModeValue("#0C0D0D", "#FEFEFE");

    function handleRunClick() {
        navigate("/content-creation/topic-generator");
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
                    color={textColor}
                    leftIcon={<LogIn04AltIcon pathFill={pathFillColor} />}
                    fontSize="16px"
                    fontWeight="500"
                    onClick={handleRunClick}
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
                        Content Creator
                    </Text>
                    <Text
                        fontWeight="500"
                        fontSize="12px"
                        lineHeight="18px"
                    >
                        Create contents powered by your sources ⚡️
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default ContentCreatorAgentCard;
