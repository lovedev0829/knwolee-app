import { Box, Button, Flex, Image, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import MediumIcon from "src/Icons/MediumIcon";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import AddMediumTokenModal from "src/components/Medium/AddMediumTokenModal";

function MediumAuth() {
  const iconColor = useColorModeValue("black", undefined);
  const { isOpen: isOpenAddMediumToken, onOpen: onOpenAddMediumToken, onClose: onCloseAddMediumToken } = useDisclosure();

  const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

  function handleMediumButtonClick() {
    onOpenAddMediumToken()
  }

  return (
    <>
      <Button
        gap={2}
        isLoading={thirdPartyConfigLoading}
        onClick={handleMediumButtonClick}
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
          <MediumIcon fill={iconColor} width="18" height="18" />
        </Flex>
        <Text>
          Medium
        </Text>

        {thirdPartyConfig?.medium?.token?.access_token ? (
          <CheckCircleIcon color="green.500" boxSize={6}/>
        ) : (
          <Box />
        )}
      </Button>

      <AddMediumTokenModal isOpen={isOpenAddMediumToken} onClose={onCloseAddMediumToken} />
    </>
  );
}

export default MediumAuth;
