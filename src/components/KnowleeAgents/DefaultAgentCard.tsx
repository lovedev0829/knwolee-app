
import { Box, Button, Flex, Text, useColorModeValue, Icon, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import KnowleeLogo from "src/Icons/KnowleeLogoAgents";
import LogIn04AltIcon from "src/Icons/knowlee-agents/LogIn04AltIcon";
import { useAddDefaultAgentToUserAgentMutation } from "src/api/mutations/knowleeAgentIndex";
import { PANEL_OPTIONS } from "src/types/panel";
import { UserAgent } from "src/types/userAgent.interface";
import PlusIcon from "src/Icons/PlusIcon";
import { useUserScrapedData } from "src/api/queries";


interface Props {
    userAgent: UserAgent
}

const DefaultAgentCard: React.FC<Props> = ({ userAgent }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const { mutateAsync, isLoading } = useAddDefaultAgentToUserAgentMutation()

    const textColor = useColorModeValue("neutral.90", "neutral.10");
    const borderColor = useColorModeValue("neutral.20", "neutral.05100");
    const buttonBorderColor = useColorModeValue("neutral.30", "neutral.05100");
    const pathFillColor = useColorModeValue("#0C0D0D", "#FEFEFE");
    const { data: userDataSources } = useUserScrapedData();    

    async function handleRunClick() {
        // if (!userDataSources || !userDataSources?.entityList?.length)
        //     return toast({
        //     title: "Oops! It seems like you haven't added a knowledge source yet.",
        //     description: "Let's add one to get started with creating your first agent!",
        //     status: "error",
        //     duration: 5000,
        //     isClosable: true,
        //   });
        await mutateAsync(userAgent._id)
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
                    leftIcon={<Icon as={PlusIcon} color="primary.50" />}
                    fontSize="16px"
                    fontWeight="500"
                    onClick={handleRunClick}
                    isDisabled={isLoading}
                    isLoading={isLoading}
                >
                    Add
                </Button>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
                <Box color={textColor}>
                    <Text
                        fontWeight="500"
                        fontSize="16px"
                        lineHeight="26px"
                    >
                        {userAgent.assistant.name}
                    </Text>
                    <Text
                        fontWeight="500"
                        fontSize="12px"
                        lineHeight="18px"
                    >
                        {userAgent.assistant.description}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default DefaultAgentCard;
