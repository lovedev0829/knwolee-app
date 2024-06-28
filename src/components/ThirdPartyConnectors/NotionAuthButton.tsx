import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import NotionIcon from "src/Icons/NotionIcon";
import { useNotionLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

function NotionAuthButton() {
  const iconColor = useColorModeValue("black" , undefined);

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeNotion, isLoading: notionAuthLoading } =
    useNotionLoginMutation();

  async function handleAuthorizeNotion() {
    const data = await authorizeNotion();
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
      isLoading={thirdPartyConfigLoading || notionAuthLoading}
      onClick={handleAuthorizeNotion}
      sx={thirdPartyConfig?.notion?.token?.access_token ? activatedStyle : {}}
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
        {thirdPartyConfig?.notion?.token?.access_token
          ? "Connected"
          : "Connect"}
      </Text>
    </Button>
  );
}

export default NotionAuthButton;
