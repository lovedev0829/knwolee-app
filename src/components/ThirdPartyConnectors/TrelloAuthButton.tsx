import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import TrelloLogo from "src/Icons/TrelloIcon";
import { useTrelloLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function TrelloAuthButton() {
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeTrello, isLoading: trelloAuthLoading } =
    useTrelloLoginMutation();

  async function handleAuthorizeTrello() {
    const data = await authorizeTrello();
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
      isLoading={thirdPartyConfigLoading || trelloAuthLoading}
      onClick={handleAuthorizeTrello}
      sx={thirdPartyConfig?.trello?.token?.access_token ? activatedStyle : {}}
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
        <TrelloLogo />
      </Flex>
      <Text>
        {thirdPartyConfig?.trello?.token?.access_token
          ? "Connected"
          : "Connect"}
      </Text>
    </Button>
  );
}

export default TrelloAuthButton;
