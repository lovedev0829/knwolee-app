import { Flex } from "@chakra-ui/react";
import GoogleAuthButton from "src/components/ThirdPartyConnectors/GoogleAuthButton";
import MicrosoftAuthButton from "src/components/ThirdPartyConnectors/MicrosoftAuthButton";
import TwitterAuthButton from "src/components/ThirdPartyConnectors/TwitterAuthButton";

function ThirdPartyConnectors() {
  return (
    <Flex padding={3} gap={3}>
      <GoogleAuthButton />
      <MicrosoftAuthButton />
      <TwitterAuthButton />
    </Flex>
  );
}

export default ThirdPartyConnectors;
