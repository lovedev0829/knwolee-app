import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import SlackIcon from "src/Icons/SlackIcon";
import { useSlackLoginMutation } from "src/api/mutations/slackIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function SlackAuthButton() {
  const iconColor = useColorModeValue("black" , undefined);

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

    const {
      mutateAsync: authorizeSlack,
      isLoading: slackAuthorizationLoading,
    } = useSlackLoginMutation();

    async function handleAuthorizeSlack() {
      const data = await authorizeSlack();
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
      isLoading={thirdPartyConfigLoading || slackAuthorizationLoading}
      onClick={handleAuthorizeSlack}
      sx={thirdPartyConfig?.slack?.token?.access_token ? activatedStyle : {}}
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
        <SlackIcon/>
      </Flex>
      <Text>
        {thirdPartyConfig?.slack?.token?.access_token
          ? "Connected"
          : "Connect"}
      </Text>
    </Button>
  );
}

export default SlackAuthButton;
