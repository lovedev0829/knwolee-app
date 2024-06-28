import { Box, Grid, GridItem, Stack, Flex, Text, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import PageContainer from "../components/PageContainer";
import Banner from "../components/Banner";
import Datasource from "../components/Dashboard/Datasource";
import UserUsage from "src/components/Dashboard/UserUsage";
import { useUserProcesses } from "src/api/queries/knowleeProcessQuery"
import StartFromScratchAgentCard from "src/components/KnowleeProcesses/StartFromScratchProcessCard"

import { HiOutlineLightBulb } from "react-icons/hi";

import { AllProcessCards } from "../pages/KnowleeProcesses/MyProcesses";

const Dashboard = () => {
  const { data: userProcessesList, isLoading } = useUserProcesses();
  const gridItemColSpan = useBreakpointValue({ base: 1, md: 5 });
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    md: "repeat(5, 1fr)",
  });

  return (
    <PageContainer
      title={
        <Flex alignItems="center">
          <Text mr={2}>Dashboard</Text>
          <Tooltip label="Knowlee Summary: 24-hour updates based on your sources, Data Sources Chart to get an overall overview, Social Announcements, Quick Access Buttons for Notifications, Edit Profile, Settings, and a glimpse into Knowlee's Recent Activities." fontSize="sm">
            <span>
              <InfoIcon boxSize="16px" />
            </span>
          </Tooltip>
        </Flex>
      }>
      <Box
        className="scroll-hover"
        overflow={"auto"}
        maxHeight="100%"
      >
        <Banner />
        <Stack>
          <Stack direction="row" alignItems="center">
            <HiOutlineLightBulb size={26} color="gray" />
            <Text color="gray.400" fontWeight={600} fontSize={18}>
              Your AI Processes
            </Text>
          </Stack>
          <Grid gap={["10px", "10px", "20px"]} templateColumns={gridTemplateColumns}>
          {userProcessesList?.length ? (
              <AllProcessCards />
            ) : (
              <GridItem colSpan={gridItemColSpan}>
                <StartFromScratchAgentCard />
              </GridItem>
            )}          </Grid>
        </Stack>
        <Grid templateColumns='repeat(2, 1fr)' gap={4} marginTop={'15px'} className="full-width-desktop">
          <GridItem w='100%' display="flex">
            <UserUsage />
          </GridItem>
          <GridItem w='100%' display="flex">
            <Datasource />
          </GridItem>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
