import { Box, Button, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import NotionIcon from "src/Icons/NotionIcon";
import { useNotionLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function NotionAuth() {
  const iconColor = useColorModeValue("black", undefined);
  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeNotion, isLoading: notionAuthLoading } =
    useNotionLoginMutation();

  async function handleAuthorizeNotion() {
    const data = await authorizeNotion();
    if (data.authURL) {
      window.location.href = data.authURL;
    }
  }

  return (
    <Button
      gap={2}
      isLoading={thirdPartyConfigLoading || notionAuthLoading}
      onClick={handleAuthorizeNotion}
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
        <NotionIcon fill={iconColor} />
      </Flex>
      <Text>
        Notion
      </Text>
      {thirdPartyConfig?.notion?.token?.access_token ? (
        <CheckCircleIcon color="green.500" boxSize={6}/>
      ) : (
        <Box />
      )}
    </Button>
  );
}

export default NotionAuth;
