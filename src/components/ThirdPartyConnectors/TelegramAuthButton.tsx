import { Button, Flex, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import TelegramIcon from "src/Icons/TelegramIcon";
import { useTelegramLoginMutation } from "src/api/mutations/telegramIndex";
import { useTelegramConfig } from "src/api/queries/telegramQuery";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import AddTelegramTokenModal from "src/components/Telegram/AddTelegramTokenModal";

function TelegramAuthButton() {
  const iconColor = useColorModeValue("black", "white");
  const { isOpen: isOpenAddTelegramToken, onOpen: onOpenAddTelegramToken, onClose: onCloseAddTelegramToken } = useDisclosure();

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  // const {
  //     data: telegramConfig,
  //     isLoading: telegramConfigLoading
  // } = useTelegramConfig();

  function handleTelegramButtonClick() {
    onOpenAddTelegramToken()
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
        isLoading={thirdPartyConfigLoading}
        onClick={handleTelegramButtonClick}
      // isDisabled={Boolean(telegramConfig)}
        sx={thirdPartyConfig?.telegram?.token?.access_token ? activatedStyle : {}}
      >
        <Flex
          alignItems="center"
          borderRadius="full"
          flexShrink={0}
          height={8}
          justifyContent="center"
          minW={8}
          width={8}
        // bgColor="icons.telegram"
        >
          <TelegramIcon  />
        </Flex>
        <Text>
          {thirdPartyConfig?.telegram?.token?.access_token
            ? "Connected"
            : "Connect"}
        </Text>
      </Button>

      <AddTelegramTokenModal isOpen={isOpenAddTelegramToken} onClose={onCloseAddTelegramToken} />
    </>
  );
}

export default TelegramAuthButton;
