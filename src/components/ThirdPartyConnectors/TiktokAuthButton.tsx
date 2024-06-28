import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useTiktokLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import TikTokIcon from "src/Icons/TikTokIcon";

function TiktokAuthButton() {

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeTiktok, isLoading: tiktokAuthLoading } =
  useTiktokLoginMutation();

  async function handleAuthorizeTiktok() {
    const data = await authorizeTiktok();
    if (data.authURL) {
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
      isLoading={thirdPartyConfigLoading || tiktokAuthLoading}
      onClick={handleAuthorizeTiktok}
      sx={thirdPartyConfig?.tiktok?.token?.access_token ? activatedStyle : {}}
    >
      <Flex
        alignItems="center"
        borderRadius={7}
        flexShrink={0}
        height={8}
        justifyContent="center"
        minW={8}
        width={8}
      >
        <TikTokIcon />
      </Flex>
      <Text>
        {thirdPartyConfig?.tiktok?.token?.access_token
          ? "Connected"
          : "Connect"}
      </Text>
    </Button>
  );
}

export default TiktokAuthButton;
