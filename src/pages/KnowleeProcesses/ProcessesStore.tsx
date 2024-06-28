import { Box, Flex, Text, useColorMode } from "@chakra-ui/react"
import KnowleeAssistantProcess from "src/components/KnowleeProcesses/KnowleeAssistantProcessCard"
import DefaultProcesses from "./DefaultProcesses";

function ProcessesStore() {
    const { colorMode } = useColorMode();
    return (
        <Box>
            {/* First horizontal scrolling section */}
            <Text
                color={colorMode === "dark" ? "neutral.40" : "neutral.60"}
                fontSize="16px"
                fontWeight="500"
                lineHeight="24px"
                mt="15px"
                mb="10px"
            >
                Knowlee's Processes
            </Text>
            <Flex
                className="scroll-hover"
                mt="24px"
                alignItems="flex-start"
                flexWrap="wrap"
                maxHeight="63vh" // Adjust based on your layout needs
                direction="row" // Stack items vertically
                wrap="nowrap" // Prevent wrapping
                gap="12px"
                overflowY="auto"
            >
                {/* <KnowleeAssistantProcess /> */}
                <DefaultProcesses />
            </Flex>
        </Box>
    );
}

export default ProcessesStore;
