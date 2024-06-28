import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import GoogleIcon from "src/Icons/GoogleIcon";
import { useGoogleLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function GoogleAuthButton() {
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeGoogle, isLoading: googleAuthLoading } =
    useGoogleLoginMutation();

  async function handleAuthorizeGoogle() {
    const data = await authorizeGoogle();
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
      isLoading={thirdPartyConfigLoading || googleAuthLoading}
      onClick={handleAuthorizeGoogle}
      sx={thirdPartyConfig?.google?.token?.access_token ? activatedStyle : {}}
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
        <GoogleIcon />
      </Flex>
      <Text>
        {thirdPartyConfig?.google?.token?.access_token
          ? "Connected"
          : "Connect"}
      </Text>
    </Button>
  );
}

export default GoogleAuthButton;
