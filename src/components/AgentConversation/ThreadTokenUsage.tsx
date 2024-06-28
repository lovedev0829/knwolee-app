import { InfoOutlineIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, Tooltip } from "@chakra-ui/react"
import useUsageStat from "src/hooks/usageStat/useUsageStat";

type Props={
    chatTokens: number;
}

function ThreadTokenUsage({chatTokens=0}:Props) {
    const { remainingTokens } = useUsageStat();
    return (
        <Flex alignItems="center">
            <Tooltip label="Number of credits processed in this chat, including custom instructions, linked data sources and API interfaces." fontSize="sm">
                <span>
                    <InfoOutlineIcon cursor="help" boxSize="14px" mb="1" color="primary.50" />
                </span>
            </Tooltip>
            <Text fontSize='14px' display="inline-block" ml={2}>
                Chat credits: {new Intl.NumberFormat().format(chatTokens)}
            </Text>
            <Box height="16px" width="1px" bg="gray.200" mx="3"></Box>
            <Text fontSize="14px">
                Remaining credits: {new Intl.NumberFormat().format(remainingTokens)}
            </Text>
            <Tooltip label="Infinite credits for our beta testers!" fontSize="sm">
                <span>
                    <InfoOutlineIcon cursor="help" boxSize="14px" ml="2" mb="1" color="primary.50" />
                </span>
            </Tooltip>
        </Flex>
    )
}

export default ThreadTokenUsage