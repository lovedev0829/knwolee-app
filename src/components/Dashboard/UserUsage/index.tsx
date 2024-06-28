import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  ListItem,
  UnorderedList,
  useColorMode,
  useColorModeValue,
  Text,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import PlusIcon from "src/Icons/PlusIcon";
import UserUsageChart from "src/components/Chat/Dashboard/UserUsageChart";
import { theme } from "src/theme";
import { Link as RouterLink } from "react-router-dom";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import { isDoubleStepEntity } from "src/utils/entity";
import { IEntityCount } from "src/types/userUsage.interface";
import CreditManager from "src/components/Modal/CreditManager";
import { useBillingManagerModalStore } from "src/store"; // Import the store


function countEntities(entityCont?: IEntityCount) {
  if(!entityCont) return {singleStepEntityCount: 0, doubleStepEntityCount:0 }
  let singleStepEntityCount = 0;
  let doubleStepEntityCount = 0;

  for (const sourceType in entityCont) {
    for (const subSetType in entityCont[sourceType as keyof IEntityCount]) {
      if (isDoubleStepEntity({ sourceType, subSetType })) {
        doubleStepEntityCount += entityCont[sourceType][subSetType];
      } else {
        singleStepEntityCount += entityCont[sourceType][subSetType];
      }
    }
  }

  return { singleStepEntityCount, doubleStepEntityCount };
}


const UserUsage = () => {
  const { colorMode } = useColorMode();
  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const textColor = useColorModeValue("neutral.90", "neutral.20");
  const borderColor = useColorModeValue("neutral.30", "neutral.80");
  const { data: userStats, isLoading } = useUserUsageStats();

  const { singleStepEntityCount, doubleStepEntityCount } = countEntities(userStats?.entityCount)
  const { isOpen, open, close } = useBillingManagerModalStore(); // Destructure modal store

  const renderContent = () => {
    if (isLoading) {
      return (
        <Flex alignItems="center" justifyContent="center" h="40vh">
          <Spinner speed="0.8s" color="primary.50" />
        </Flex>
      );
    }
    if (!userStats && !isLoading) {
      return (
        <Flex alignItems="center" justifyContent="center" h="40vh">
          <Text>User stats are not available</Text>
        </Flex>
      );
    }

    return (
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={1}
        className="full-width-desktop"
        alignItems="center"
      >
        <GridItem display="flex">
          <UserUsageChart userStats={userStats} />
        </GridItem>
        <GridItem w="100%" display="flex" mt="8" p="4">
          <UnorderedList>
            <ListItem fontWeight="bold">
              Data Sources:
              <Text as="span" fontWeight="normal" ml={2}>
                {singleStepEntityCount + doubleStepEntityCount}
              </Text>
            </ListItem>
            <ListItem fontWeight="bold">
              AI Assistants:
              <Text as="span" fontWeight="normal" ml={2}>
                {userStats?.userAgentCount}
              </Text>
            </ListItem>
            <ListItem fontWeight="bold">
              Chats:
              <Text as="span" fontWeight="normal" ml={2}>
                {userStats?.userThreadCount}
              </Text>
            </ListItem>
            <ListItem fontWeight="bold">
              Generated Images:
              <Text as="span" fontWeight="normal" ml={2}>
                {Number(userStats?.textToImage?.dalle3Count || 0) +
                  Number(userStats?.textToImage?.sdxlCount || 0)}
              </Text>
            </ListItem>
            <ListItem fontWeight="bold">
              Generated Videos:
              <Text as="span" fontWeight="normal" ml={2}>
                {userStats?.textToVideoCount}
              </Text>
            </ListItem>
            <ListItem fontWeight="bold">
              Generated Audios:
              <Text as="span" fontWeight="normal" ml={2}>
                {userStats?.textToAudioCount}
              </Text>
            </ListItem>
          </UnorderedList>
        </GridItem>
      </Grid>
    );
  };
  return (
    <Container
      border={"solid 1px"}
      borderRadius={"10px"}
      borderColor={colorMode === "dark" ? "#343839" : theme.colors.neutral[30]}
      padding={"0"}
      maxWidth={"inherit"}
    >
      <Flex
        gap="8px"
        justifyContent="space-between"
        alignItems="center"
        padding="20px 20px 0 20px"
        flexWrap="wrap"
      >
        <Heading
          as="h2"
          color={headingTextColor}
          fontSize="20px"
          fontWeight="500"
          lineHeight="28px"
        >
          Your Stats
        </Heading>
        <Flex gap={2} overflow={"auto"}>
        <Button
          variant="outline"
          border="2px solid"
          borderColor={borderColor}
          leftIcon={<PlusIcon />}
          color={textColor}
          fontSize="14px"
          fontWeight="500"
          as={RouterLink}
          onClick={open} // Open the modal on click
          flexShrink={0}
          >
          Buy Credits
        </Button>
        <Button
          variant="outline"
          border="2px solid"
          borderColor={borderColor}
          leftIcon={<PlusIcon />}
          color={textColor}
          fontSize="14px"
          fontWeight="500"
          as={RouterLink}
          to="/subscriptions"
          flexShrink={0}
        >
          Upgrade Plan
        </Button>
        </Flex>
      </Flex>
      {renderContent()}
      <CreditManager isOpen={isOpen} onClose={close} onConfirm={() => console.log('Confirmed')} />
    </Container>
  );
};

export default UserUsage;
