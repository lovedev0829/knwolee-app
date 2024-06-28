import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import MicrosoftIcon from "src/Icons/MicrosoftIcon";
import { useMicrosoftLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function MicrosoftAuthButton() {
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeMicrosoft, isLoading: microsoftAuthLoading } =
    useMicrosoftLoginMutation();

  async function handleAuthorizeMicrosoft() {
    const data = await authorizeMicrosoft();
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
      isLoading={thirdPartyConfigLoading || microsoftAuthLoading}
      onClick={handleAuthorizeMicrosoft}
      sx={thirdPartyConfig?.microsoft?.token?.access_token ? activatedStyle : {}}
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
        <MicrosoftIcon />
      </Flex>
      <Text>
        {thirdPartyConfig?.microsoft?.token?.access_token
          ? "Connected"
          : "Connect"}
      </Text>
    </Button>
  );
}

export default MicrosoftAuthButton;
