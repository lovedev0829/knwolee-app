import {
    Box,
    Button,
    Flex,
    Text,
    useColorModeValue,
    Icon,
} from "@chakra-ui/react";
import KnowleeLogo from "src/Icons/KnowleeLogoAgents";
import { UserProcess } from "src/types/userProcess.interface";
import PlusIcon from "src/Icons/PlusIcon";
import { useAddDefaultProcessMutation } from "src/api/mutations/knowleeProcessIndex";

interface Props {
    userProcess: UserProcess;
}

const DefaultAgentCard: React.FC<Props> = ({ userProcess }) => {
    const { name, goals, _id } = userProcess;

    const textColor = useColorModeValue("neutral.90", "neutral.10");
    const borderColor = useColorModeValue("neutral.20", "neutral.05100");
    const buttonBorderColor = useColorModeValue("neutral.30", "neutral.05100");

    const { mutateAsync, isLoading } = useAddDefaultProcessMutation();

    async function handleAddDefaultProcessClick() {
        await mutateAsync(_id);
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
            <Flex alignItems="center" gap="16px" justifyContent="space-between">
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
                    onClick={handleAddDefaultProcessClick}
                    isLoading={isLoading}
                >
                    Add
                </Button>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
                <Box color={textColor}>
                    <Text fontWeight="500" fontSize="16px" lineHeight="26px">
                        {name}
                    </Text>
                    <Text fontWeight="500" fontSize="12px" lineHeight="18px">
                        {goals?.[0]?.goal}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default DefaultAgentCard;
