import { Box, Button, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import TwitterAuthIcon from "src/Icons/TwitterAuthIcon";
import { useTwitterLoginMutation } from "src/api/mutations/twitterIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function TwitterAuth() {
  const iconColor = useColorModeValue("black", undefined);

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const {
    mutateAsync: authorizeTwitter,
    isLoading: twitterAuthorizationLoading,
  } = useTwitterLoginMutation();

  async function handleAuthorizeTwitter() {
    const data = await authorizeTwitter();
    if (data.authURL) {
      window.location.href = data.authURL;
    }
  }

  return (
    <Button
      gap={2}
      isLoading={thirdPartyConfigLoading || twitterAuthorizationLoading}
      onClick={handleAuthorizeTwitter}
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
        <TwitterAuthIcon fill={iconColor} />
      </Flex>
      <Text>
        Twitter
      </Text>
      {thirdPartyConfig?.twitter?.token?.access_token ? (
        <CheckCircleIcon color="green.500" boxSize={6}/>
      ) : (
        <Box />
      )}
    </Button>
  );
}

export default TwitterAuth;
