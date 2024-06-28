import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import LinkedinIcon from "src/Icons/LinkedinIcon";
import { useLinkedInLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function LinkedInAuth() {
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeLinkedIn, isLoading: linkedInAuthLoading } =
    useLinkedInLoginMutation();

  async function handleAuthorizeLinkedIn() {
    const data = await authorizeLinkedIn();
    if (data.authURL) {
      window.location.href = data.authURL;
    }
  }

  return (
    <Button
      gap={2}
      isLoading={thirdPartyConfigLoading || linkedInAuthLoading}
      onClick={handleAuthorizeLinkedIn}
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
        <LinkedinIcon />
      </Flex>
      <Text>
        Linkedin
      </Text>
      {thirdPartyConfig?.linkedin?.token?.access_token ? (
        <CheckCircleIcon color="green.500" boxSize={6}/>
      ) : (
        <Box />
      )}
    </Button>
  );
}

export default LinkedInAuth;
