import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import MicrosoftIcon from "src/Icons/MicrosoftIcon";
import { useMicrosoftLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function MicrosoftAuth() {
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeMicrosoft, isLoading: microsoftAuthLoading } =
    useMicrosoftLoginMutation();

  async function handleAuthorizeMicrosoft() {
    const data = await authorizeMicrosoft();
    if (data.authURL) {
      window.location.href = data.authURL;
    }
  }

  return (
    <Button
      gap={2}
      isLoading={thirdPartyConfigLoading || microsoftAuthLoading}
      onClick={handleAuthorizeMicrosoft}
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
        <MicrosoftIcon />
      </Flex>
      <Text>
        Microsoft
      </Text>
      {thirdPartyConfig?.microsoft?.token?.access_token ? (
        <CheckCircleIcon color="green.500" boxSize={6}/>
      ) : (
        <Box />
      )}
    </Button>
  );
}

export default MicrosoftAuth;
