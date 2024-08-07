import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import TrelloLogo from "src/Icons/TrelloIcon";
import { useTrelloLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function TrelloAuth() {
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeTrello, isLoading: trelloAuthLoading } =
    useTrelloLoginMutation();

  async function handleAuthorizeTrello() {
    const data = await authorizeTrello();
    if (data.authURL) {
      window.location.href = data.authURL;
    }
  }

  return (
    <Button
      gap={2}
      isLoading={thirdPartyConfigLoading || trelloAuthLoading}
      onClick={handleAuthorizeTrello}
      justifyContent={"space-between"}
      borderRadius={"24px"}
      py={6}
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
        Trello
      </Text>
      {thirdPartyConfig?.trello?.token?.access_token ? (
        <CheckCircleIcon color="green.500" boxSize={6}/>
      ) : (
        <Box />
      )}
    </Button>
  );
}

export default TrelloAuth;
