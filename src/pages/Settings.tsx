import React from "react";
import PageContainer from "../components/PageContainer";
// import SettingDemo from "../components/Settings";
import SettingContent from "src/components/Settings/SettingContent";
import {
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";


const Settings: React.FC = () => {
  // const [modalOpen, setModalOpen] = useState(true);

  return (
    <PageContainer 
            title={
                <Flex alignItems="center">
                <Text mr={2}>Settings</Text>
                <Tooltip label="Update personal info, customize voice settings for text-to-audio, and manage in-app and email notifications." fontSize="sm">
                    <span>
                    <InfoIcon boxSize="16px" />
                    </span>
                </Tooltip>
                </Flex>
            }
            >
      {/* <SettingDemo isOpen={modalOpen} onClose={() => setModalOpen(false)}  /> */}
      <SettingContent />
    </PageContainer>
  );
};

export default Settings;
