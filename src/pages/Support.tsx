import { Box,
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Community from "../components/CommunitySupport/Community";
import Support from "../components/CommunitySupport/Support";
import Tutorials from "../components/CommunitySupport/Tutorials";
import PageContainer from "../components/PageContainer";
import { TabButton } from "./SharedUi/Buttons";

const CommunityAndSupport = () => {
  const [activeTab, setActiveTab] = useState("support");

  return (
    <PageContainer 
        title={
            <Flex alignItems="center">
            <Text mr={2}>Help</Text>
            <Tooltip label="Join and engage with our communities on social media; Share your feedback to help us improve; Explore tutorials and documentation for guidance; Need assistance? Send us an email or open a support ticket." fontSize="sm">
                <span>
                <InfoIcon boxSize="16px" />
                </span>
            </Tooltip>
            </Flex>
        }
        >
      <Box display="flex" justifyContent="space-between" w="100%">
        <Box display="flex" gap="12px">
          <TabButton
            isActive={activeTab === "support"}
            onClick={() => setActiveTab("support")}
          >
            Support
          </TabButton>
          <TabButton
            isActive={activeTab === "tutorials"}
            onClick={() => setActiveTab("tutorials")}
          >
            Tutorials
          </TabButton>
          <TabButton
            isActive={activeTab === "community"}
            onClick={() => setActiveTab("community")}
          >
            Community
          </TabButton>
        </Box>
      </Box>

      {activeTab === "community" && <Community />}
      {activeTab === "support" && <Support />}
      {activeTab === "tutorials" && <Tutorials />}
    </PageContainer>
  );
};

export default CommunityAndSupport;
