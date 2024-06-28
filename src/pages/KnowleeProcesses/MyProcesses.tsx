import { Box, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import { useUserData } from "src/api/queries";
import { useUserProcesses } from "src/api/queries/knowleeProcessQuery"
import ProcessCard from "src/components/KnowleeProcesses/ProcessCard"
import StartFromScratchAgentCard from "src/components/KnowleeProcesses/StartFromScratchProcessCard"

export function AllProcessCards() {
    const { data: userProcessesList, isLoading } = useUserProcesses();
    const { data: userData } = useUserData();
    if (isLoading)
        return (
            <Box width="full" textAlign="center">
                <Spinner speed="0.8s" color="primary.50" />
            </Box>
        );
    if (!userProcessesList?.length)
        return /*(
            <Text textAlign="center" width="full">
                No User Processes Found
            </Text>
        )*/;
    return (
        <>
            {userProcessesList.map((userProcess) => {
                const isCreator = userProcess?.creatorId === userData?.id;

                return (
                    <ProcessCard
                        process={userProcess}
                        isCreator={isCreator}
                        key={userProcess.id}
                    />
                );
            })}
        </>
    );
}

function MyProcesses() {
    const textColor = useColorModeValue("neutral.60", "neutral.40");
    return (
        <Box>
            {/* First horizontal scrolling section */}
            <Text
                color={textColor}
                fontSize="16px"
                fontWeight="500"
                lineHeight="24px"
                mt="15px"
                mb="10px"
            >
                Your Processes
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
                <StartFromScratchAgentCard />
                <AllProcessCards />
            </Flex>
        </Box>
    );
}

export default MyProcesses;
