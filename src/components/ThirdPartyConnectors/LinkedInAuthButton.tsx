import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import LinkedinIcon from "src/Icons/LinkedinIcon";
import { useLinkedInLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function LinkedInAuthButton() {
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeLinkedIn, isLoading: linkedInAuthLoading } =
  useLinkedInLoginMutation();

  async function handleAuthorizeLinkedIn() {
    const data = await authorizeLinkedIn();
    if (data.authURL) {
      // window.open(data.authURL);
      window.location.href = data.authURL;
    }
  }  
  const activatedStyle = {
    backgroundColor: useColorModeValue("#3FDD78", ""),
    bgColor: "#3FDD78",
    color: "#000000"
  };

  return (
    <Button
      gap={2}
      isLoading={thirdPartyConfigLoading || linkedInAuthLoading}
      onClick={handleAuthorizeLinkedIn}
      sx={thirdPartyConfig?.linkedin?.token?.access_token ? activatedStyle : {}}
    >
      <Flex
        alignItems="center"
        borderRadius="full"
        flexShrink={0}
        height={8}
        justifyContent="center"
        minW={8}
        width={8}
      >
        <LinkedinIcon />
      </Flex>
      <Text>
        {thirdPartyConfig?.linkedin?.token?.access_token
          ? "Connected"
          : "Connect"}
      </Text>
    </Button>
  );
}

export default LinkedInAuthButton;
