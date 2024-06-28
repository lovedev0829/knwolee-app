import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import TwitterAuthIcon from "src/Icons/TwitterAuthIcon";
import { useTwitterLoginMutation } from "src/api/mutations/twitterIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function TwitterAuthButton() {
  const iconColor = useColorModeValue("black" , undefined);

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

    const {
      mutateAsync: authorizeTwitter,
      isLoading: twitterAuthorizationLoading,
    } = useTwitterLoginMutation();

    async function handleAuthorizeTwitter() {
      const data = await authorizeTwitter();
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
      isLoading={thirdPartyConfigLoading || twitterAuthorizationLoading}
      onClick={handleAuthorizeTwitter}
      sx={thirdPartyConfig?.twitter?.token?.access_token ? activatedStyle : {}}
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
        {/* <TwitterIcon /> */}
        <TwitterAuthIcon fill={iconColor} />
      </Flex>
      <Text>
        {thirdPartyConfig?.twitter?.token?.access_token
          ? "Connected"
          : "Connect"}
      </Text>
    </Button>
  );
}

export default TwitterAuthButton;
