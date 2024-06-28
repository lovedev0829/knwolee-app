import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import GoogleIcon from "src/Icons/GoogleIcon";
import { useGoogleLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function GoogleAuth() {
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

  return (
    <Button
      gap={2}
      isLoading={thirdPartyConfigLoading || googleAuthLoading}
      onClick={handleAuthorizeGoogle}
      justifyContent={"space-between"}
      borderRadius={"24px"}
      width={"100%"}
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
        <GoogleIcon />
      </Flex>
      <Text>
        Google
      </Text>
      {thirdPartyConfig?.google?.token?.access_token ? (
        <CheckCircleIcon color="green.500" boxSize={6}/>
      ) : (
        <Box />
      )}
    </Button>
  );
}

export default GoogleAuth;
