import {
  Box,
  Flex,
  Text,
  Tooltip,
  Spinner,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import PageContainer from "../components/PageContainer";
import { useUserData } from "src/api/queries";
import { Navigate } from "react-router-dom";
import { useAdminDashboardStats } from "src/api/queries/adminQuery";
import DeleteUser from "src/components/SuperAdmin/DeleteUser";
import DeleteSource from "src/components/SuperAdmin/DeleteSource";
import DeleteUnusedVectors from "src/components/SuperAdmin/DeleteUnusedVectors";
import CleanupUserKnowledge from "src/components/SuperAdmin/CleanupUserKnowledge";

function SuperAdminDashboard() {
  const textColor = useColorModeValue("neutral.60", "neutral.40");

  const {
    data: userData,
    isLoading: isLoadingUserData,
    isError: isErrorUserData,
  } = useUserData();

  const {
    data: adminDashboardStats,
    isLoading: isLoadingAdminDashboardStats,
  } = useAdminDashboardStats();

  if (isLoadingUserData || isErrorUserData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner color="primary.50" />
      </Box>
    );
  }

  if (!userData?.isSuperAdmin) {
    return <Navigate to="/dashboard" />;
  }

  if (isLoadingAdminDashboardStats) {
    return (
        <Box display="flex" textAlign={"center"} width="full" padding="8px" justifyContent="center" alignItems="center" height="100vh">
        <Spinner color="primary.50" />
      </Box>
    );
  }

  if (!adminDashboardStats) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <PageContainer
      title={
        <Flex alignItems="center">
          <Text mr={2}>Super Admin Dashboard</Text>
          <Tooltip label="Super Admin Dashboard" fontSize="sm">
            <span>
              <InfoIcon boxSize="16px" />
            </span>
          </Tooltip>
        </Flex>
      }
    >
      <Box className="scroll-hover" overflow={"auto"} maxHeight="100%">
        <UnorderedList>
          <ListItem>
            <Text fontWeight={700}>
              {"Users Registered: "}
              <Text as="span" fontWeight={400}>
                {adminDashboardStats.userRegistered}
              </Text>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight={700}>
              Users With 1 Action:
            </Text>
              <UnorderedList>
                <ListItem>
                  <Text fontWeight={700}>
                    {`Users with Sources > 1: `}
                    <Text as="span" fontWeight={400}>
                      {adminDashboardStats.userWithSourcesGreaterThan1}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight={700}>
                    {`Users with Token Usage > 1: `}
                    <Text as="span" fontWeight={400}>
                      {adminDashboardStats.userWithTokenUsageMoreThan1}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight={700}>
                    {"at least a login in the last 24h: "}
                    <Text as="span" fontWeight={400}>
                      {adminDashboardStats.userLoggedin24h}
                    </Text>
                  </Text>
                </ListItem>
              </UnorderedList>
          </ListItem>
          <ListItem>
            <Text fontWeight={700}>
              {`Users with Token Usage > 250: `}
              <Text as="span" fontWeight={400}>
                {adminDashboardStats.userWithTokenUsageMoreThan250}
              </Text>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight={700}>
              {"Average Token Usage Per Customer: "}
              <Text as="span" fontWeight={400}>
                {Math.round(adminDashboardStats.averageTokenUsagePerCustomer)}
              </Text>
            </Text>
          </ListItem>
        </UnorderedList>
        <Box marginTop="16px">
          <Text color={textColor} fontSize="16px" fontWeight="500">
            User Management:
          </Text>
          <DeleteUser />
          <DeleteSource />
        </Box>
        <DeleteUnusedVectors />
        <CleanupUserKnowledge />
      </Box>
    </PageContainer>
  );
}

export default SuperAdminDashboard;
