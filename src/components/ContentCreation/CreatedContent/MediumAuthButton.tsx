import { Button, Flex, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import MediumIcon from "src/Icons/MediumIcon";
import { useMediumLoginMutation } from "src/api/mutations/mediumIndex";
import { useMediumConfig } from "src/api/queries/mediumQuery";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import AddMediumTokenModal from "src/components/Medium/AddMediumTokenModal";

function MediumAuthButton() {
  const iconColor = useColorModeValue("black", "white");
  const { isOpen: isOpenAddMediumToken, onOpen: onOpenAddMediumToken, onClose: onCloseAddMediumToken } = useDisclosure();

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  // const {
  //     data: mediumConfig,
  //     isLoading: mediumConfigLoading
  // } = useMediumConfig();

  function handleMediumButtonClick() {
    onOpenAddMediumToken()
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
        onClick={handleMediumButtonClick}
      // isDisabled={Boolean(mediumConfig)}
        sx={thirdPartyConfig?.medium?.token?.access_token ? activatedStyle : {}}
      >
        <Flex
          alignItems="center"
          borderRadius="full"
          flexShrink={0}
          height={8}
          justifyContent="center"
          minW={8}
          width={8}
        // bgColor="icons.medium"
        >
          <MediumIcon fill={iconColor} width="18" height="18" />
        </Flex>
        <Text>
          {thirdPartyConfig?.medium?.token?.access_token
            ? "Connected"
            : "Connect"}
        </Text>
      </Button>

      <AddMediumTokenModal isOpen={isOpenAddMediumToken} onClose={onCloseAddMediumToken} />
    </>
  );
}

export default MediumAuthButton;
