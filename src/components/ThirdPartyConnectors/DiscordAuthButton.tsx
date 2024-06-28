import { Button, Flex, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import DiscordIcon from "src/Icons/DiscordIcon";
import { useDiscordLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import AddDiscordTokenModal from "../Discord/AddDiscordTokenModal";

function DiscordAuthButton() {
  const iconColor = useColorModeValue("black", undefined);
  const { isOpen: isOpenAddDiscordToken, onOpen: onOpenAddDiscordToken, onClose: onCloseAddDiscordToken } = useDisclosure();

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  const { mutateAsync: authorizeDiscord, isLoading: discordAuthLoading } =
    useDiscordLoginMutation();

  async function handleAuthorizeDiscord() {
    onOpenAddDiscordToken()
    // const data = await authorizeDiscord();
    // if (data.authURL) {
    //   // window.open(data.authURL);
    //   window.location.href = data.authURL;
    // }
  }
  const activatedStyle = {
    backgroundColor: useColorModeValue("#3FDD78", ""),
    bgColor: "#3FDD78",
    color: "#000000"
  };

  return (
    <>
      <Button
        gap={2}
        isLoading={thirdPartyConfigLoading || discordAuthLoading}
        onClick={handleAuthorizeDiscord}
        sx={thirdPartyConfig?.discord?.token?.access_token ? activatedStyle : {}}
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
          {/* <DiscordIcon fill={iconColor} /> */}
          <DiscordIcon />
        </Flex>
        <Text>
          {thirdPartyConfig?.discord?.token?.access_token
            ? "Connected"
            : "Connect"}
        </Text>
      </Button>
      <AddDiscordTokenModal isOpen={isOpenAddDiscordToken} onClose={onCloseAddDiscordToken} />
    </>

  );
}

export default DiscordAuthButton;
