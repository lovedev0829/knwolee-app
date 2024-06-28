import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import SlackIcon from "src/Icons/SlackIcon";
import { useSlackLoginMutation } from "src/api/mutations/slackIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function SlackAuth() {
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const {
    mutateAsync: authorizeSlack,
    isLoading: slackAuthorizationLoading,
  } = useSlackLoginMutation();

  async function handleAuthorizeSlack() {
    const data = await authorizeSlack();
    if (data.authURL) {
      window.location.href = data.authURL;
    }
  }

  return (
    <Button
      gap={2}
      isLoading={thirdPartyConfigLoading || slackAuthorizationLoading}
      onClick={handleAuthorizeSlack}
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
        <SlackIcon />
      </Flex>
      <Text>
        Slack
      </Text>
      {thirdPartyConfig?.slack?.token?.access_token ? (
        <CheckCircleIcon color="green.500" boxSize={6}/>
      ) : (
        <Box />
      )}
    </Button>
  );
}

export default SlackAuth;
