import { Box, Flex, Spinner, Text, useColorMode } from "@chakra-ui/react"
import { useUserData } from "src/api/queries";
import { useUserAgents } from "src/api/queries/knowleeAgentQuery"
import AssistantCard from "src/components/KnowleeAgents/AssistantCard"
import StartFromScratchAgentCard from "src/components/KnowleeAgents/StartFromScratchAgentCard"
// import ContentCreatorAgent from "src/components/KnowleeAgents/ContentCreatorAgentCard"
// import VideoCreatorAgent from "src/components/KnowleeAgents/VideoCreatorAgentCard"
// import CryptoInsightsAgent from "src/components/KnowleeAgents/CryptoInsightsAgentCard"
// import ImageInterpreterAgent from "src/components/KnowleeAgents/ImageInterpreterAgentCard"
import KnowleeAssistantAgent from "src/components/KnowleeAgents/KnowleeAssistantAgentCard"
// import VideoInterpreterAgent from "src/components/KnowleeAgents/VideoInterpreterAgentCard"
// import TextToImageAgent from "src/components/KnowleeAgents/TextToImageAgentCard"
// import TextToVideoAgent from "src/components/KnowleeAgents/TextToVideoAgentCard"
// import TextToAudioAgent from "src/components/KnowleeAgents/TextToAudioAgentCard"
// import FootballAgent from  'src/components/KnowleeAgents/FootballAgentCard'
import DefaultAgents from "./DefaultAgents";

function AgentsStore() {
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
                Knowlee's Assistants
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
                <KnowleeAssistantAgent />
                <DefaultAgents />
                {/*<ContentCreatorAgent />
                <VideoCreatorAgent />
                <CryptoInsightsAgent />
                <ImageInterpreterAgent />
                <VideoInterpreterAgent />
                <TextToImageAgent />
                <TextToVideoAgent />
                <TextToAudioAgent />
                <FootballAgent /> */}
            </Flex>
        </Box>
    );
}

export default AgentsStore;
