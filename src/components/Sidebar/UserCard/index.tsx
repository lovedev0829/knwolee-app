import { useAuth0 } from "@auth0/auth0-react";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useDisclosure,
  Tooltip,
  Progress,
} from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import useUserAvatar from "../../hooks/UseUserAvatar";
import { useUserData, useUserNotifications } from "../../../api/queries";
import InviteFriendsModal from "src/components/Modal/InviteFriendsModal";
import NotificationIcon from "src/components/Dashboard/Icons/NotificationIcon";
import NotificationModal from "src/components/Notifications";
import SettingsIcon from "src/Icons/SettingsIcon";
import HelpIconComponent from "src/Icons/HelpIconComponent";
import RefIconComponent from "src/Icons/RefIconComponent";
import { Link } from "react-router-dom";
import GiftPng from "src/assets/images/Gift.png";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";
import { IUserUsageStat } from "src/types/userUsage.interface";
import useUsageStat from "src/hooks/usageStat/useUsageStat";


// type InviteButtonProps = {
//   colorMode: "light" | "dark";
//   onClick: () => void;
// };

const Container = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 12px;
  box-shadow: 0px 20px 24px 0px rgba(0, 0, 0, 0.5);
  background: #232627;
`;

const UserItem = styled.div`
  display: flex;
  width: 264px;
  padding: 10px;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
`;

const DataBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const UserName = styled.div`
  color: #fefefe;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

const UserStatus = styled.div`
  display: flex;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: #e8c547;

  color: "#191A1A" !important;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

// const InviteButton = styled.div<InviteButtonProps>`
//   display: flex;
//   padding: 12px 24px;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;
//   align-self: stretch;
//   border-radius: 10px;
//   color: white;
//   border: 2px solid #4a4d4f;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 24px;
//   &:hover {
//     cursor: pointer;
//     background-color: ${props => props.colorMode === "dark" ? 'transparent' : 'neutral.20'};
//   }
// `;

interface Props {
  collapsed?: boolean;
}
interface UserUsageChartProps {
  userStats: IUserUsageStat | null;
}

const UserCard: React.FC<Props> = ({ collapsed = false }) => {
  const {
    user: userAuth0Data,
    isLoading: isAuthLoading,
    isAuthenticated,
  } = useAuth0();
  const { data: userDBData, isLoading: isDbDataLoading } = useUserData();
  const { avatarURL, isAvatarLoading, setIsCDNLoading } = useUserAvatar();
  const { data: userStats, isLoading } = useUserUsageStats();
  // //console.log("data----->", userSubsriptionRes);
  // const usedCredits = (userStats?.totalRunTokenUsed ?? 0) + (userStats?.tokenUsed ?? 0);
  const purchasedCredits = (userStats?.credit?.total ?? 0) 
  const { data: userSubsriptionRes } = useGetUserSubscription();
  const { plan } = userSubsriptionRes?.userSubscription || {};
  if (typeof plan === "string") return 0;
  const planTotalCredits = (plan?.features?.maxTokens || 0);  // Placeholder for maximum credits
  const totalCredits = planTotalCredits + purchasedCredits;  // Add purchasedCredits to totalCredits
  const { remainingTokens } = useUsageStat();
  const creditPercentage = (remainingTokens / totalCredits) * 100;


  const {
    isOpen: isOpenNotificationModal,
    onOpen: onOpenNotificationModal,
    onClose: onCloseNotificationModal,
  } = useDisclosure();
  const {
    isOpen: isOpenInviteModal,
    onOpen: onOpenInviteModal,
    onClose: onCloseInviteModal,
  } = useDisclosure();

  const { data: notifications } = useUserNotifications();

  const unreadNotificationCount =
    notifications?.filter((notification) => !notification.isViewed).length || 0;

  const getUserDisplayedName = () => {
    // Add loading skeleton
    if (isAuthLoading || isDbDataLoading) {
      return (
        <Skeleton
          width="32"
          height="4"
          startColor="neutral.10"
          endColor="neutral.60"
        />
      );
    }
    return userDBData?.username || userAuth0Data?.name || "User";
  };

  function getCurrentPlanName() {
    const defaultPlanName = "Beta";
    if (userSubsriptionRes?.userSubscription?.plan) {
      if (typeof userSubsriptionRes?.userSubscription?.plan === "string") {
        return defaultPlanName;
      }
      return userSubsriptionRes?.userSubscription?.plan?.name;
    }
    return defaultPlanName;
  }

  if (collapsed && isAuthenticated) {
    return (
      <Avatar
        size="md"
        src={avatarURL}
        borderRadius="full"
        boxSize="40px"
        referrerPolicy="no-referrer"
      />
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
    <Container>
      {isAuthenticated && (
        <>
          <UserItem>
            <AspectRatio ratio={1} width="40px">
              <>
                {/* {isAvatarLoading && (
                  <Box >
                    <Spinner size="md" speed="0.8s" color="neutral.30" />
                  </Box>
                )} */}

                {isAvatarLoading && (
                  <SkeletonCircle
                    size="md"
                    startColor="neutral.10"
                    endColor="neutral.60"
                  />
                )}

                <Avatar
                  src={avatarURL}
                  onLoad={() => setIsCDNLoading(false)}
                  name="Avatar"
                  size="md"
                  borderRadius="full"
                  boxSize="40px"
                  referrerPolicy="no-referrer"
                  opacity={!isAvatarLoading ? 1 : 0}
                  transition="opacity 0.3s"
                />
              </>
            </AspectRatio>
            <DataBox>
              <UserName>{getUserDisplayedName()}</UserName>
              <UserStatus>
                <Text color={"neutral.90"} fontWeight={"medium"}>
                  {getCurrentPlanName()}
                </Text>
              </UserStatus>
            </DataBox>
          </UserItem>
          {/* <InviteButton
            colorMode={colorMode}
            onClick={onOpenInviteModal}
          >
            Invite Friends
          </InviteButton> */}
            <Box width="100%" marginBottom="10px">
              <Text fontSize="sm" color="white" textAlign="center" mb={1}>
              {`${remainingTokens.toLocaleString()} / ${totalCredits.toLocaleString()} Credits`}
              </Text>
              <Progress
                value={creditPercentage}
                size="sm"
                colorScheme="green"
                borderRadius="md"
              />
            </Box>
          <Flex alignItems="center" gap="20px" justifyContent="center" width="full">
            <Tooltip label="View notifications" fontSize="sm">
              <Button
                variant="unstyled"
                padding="4px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexShrink={0}
                borderRadius="5px"
                background="rgba(255, 255, 255, 0.26)"
                minWidth="32px"
                height="32px"
                position="relative"
                onClick={onOpenNotificationModal}
              >
                <NotificationIcon fill="#FEFEFE" />
                {unreadNotificationCount > 0 && (
                  <Box
                    position={"absolute"}
                    right={"2px"}
                    top={"2px"}
                    bgColor={"#FFAB3F"}
                    borderRadius={"4px"}
                    color={"#FFFFFF"}
                    minWidth={"14px"} // Minimum width
                    minHeight={"14px"} // Minimum height
                  >
                    <Box
                      fontSize={"10px"}
                      fontWeight={"800"}
                      padding={"1px 2px 0.5px 2px"}
                    >
                      {unreadNotificationCount}
                    </Box>
                  </Box>
                )}
              </Button>
            </Tooltip>

            <Tooltip label="Invite friends & earn" fontSize="sm">
              <Button
                variant="unstyled"
                padding="4px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexShrink={0}
                borderRadius="5px"
                background="rgba(255, 255, 255, 0.26)"
                minWidth="32px"
                height="32px"
                onClick={onOpenInviteModal}
              >
                <RefIconComponent pathFill="#FEFEFE" />
              </Button>
            </Tooltip>

            <Tooltip label="Help and support" fontSize="sm">
              <Button
                as={Link}
                variant="unstyled"
                padding="4px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexShrink={0}
                borderRadius="5px"
                background="rgba(255, 255, 255, 0.26)"
                minWidth="32px"
                height="32px"
                to="/support"
              >
                <HelpIconComponent pathFill="#FEFEFE" />
              </Button>
            </Tooltip>

            <Tooltip label="Settings" fontSize="sm">
              <Button
                as={Link}
                variant="unstyled"
                padding="4px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexShrink={0}
                borderRadius="5px"
                background="rgba(255, 255, 255, 0.26)"
                minWidth="32px"
                height="32px"
                to="/settings/profile"
              >
                <SettingsIcon pathFill="#FEFEFE" />
              </Button>
            </Tooltip>
          </Flex>


          <NotificationModal
            isOpen={isOpenNotificationModal}
            onClose={onCloseNotificationModal}
          />

          <InviteFriendsModal
            isOpen={isOpenInviteModal}
            onClose={onCloseInviteModal}
          />
        </>
      )}
    </Container>
  );
};

export default UserCard;
