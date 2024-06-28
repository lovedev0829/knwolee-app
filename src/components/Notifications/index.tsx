/* eslint-disable react-refresh/only-export-components */
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useColorMode,
  Button
} from "@chakra-ui/react";
import React, { useState } from 'react';
import NotificationIcon from "../../Icons/NotificationIcon";
import { useUserNotifications } from "../../api/queries";
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { useMarkNotificationsAsViewedMutation, useMarkNotificationsAsUnreadMutation } from "../../api/mutations/notifications";
import { formatDistanceToNow } from "date-fns";
import { Notification } from "src/utils/types";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "This is an example of notification",
    message: "You can read the full message here.",
    url: "https://app.knowlee.ai/knowledge-sources",
    isViewed: false,
    createdAt: new Date().toString(),
    userId: "",
  },
];

const NOTIFICSTION_TAB = {
  ALL: "All",
  CATEGORY: "Category",
} as const;

type NotificationTab = (typeof NOTIFICSTION_TAB)[keyof typeof NOTIFICSTION_TAB];

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
const { data, isLoading, isError } = useUserNotifications();
  const markAsViewed = useMarkNotificationsAsViewedMutation()
  const markAsUnread = useMarkNotificationsAsUnreadMutation();

  const { colorMode } = useColorMode();

  const [selectedTab, setSelectedTab] = useState<string>(NOTIFICSTION_TAB.ALL);

  const isActiveTab = (tabName: string) => {
    return selectedTab === tabName;
  };

  const customScrollbar = {
    "&::-webkit-scrollbar": {
      width: "4px",
      marginLeft: "28px",
    },
    // "&::-webkit-scrollbar-track": {
    //   backgroundColor: colorMode === "dark" ? "neutral.90" : "primary.10",
    // },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.50",
      borderRadius: "5px",
    },
  };

  const getNotifications = () => (data?.length ? data : mockNotifications);

  const handleNotificationClick = (id: string, url: string) => () => {
    markAsViewed.mutate([id])
    // absolute url
    window.open(url, "_blank");
  }

  const handleMarkAsViewedToggle = (id: string, isViewed: boolean) => () => {
    if (isViewed) {
      markAsUnread.mutate([id]);
    } else {
      markAsViewed.mutate([id]);
    }
  };
    
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay
        bg={colorMode === "dark" ? "rgba(35, 38, 39, 0.90)" : undefined}
      />
      <ModalContent
        p="48px 0 48px 40px"
        borderRadius="24px"
        backgroundColor={colorMode === "dark" ? "neutral.100" : undefined}
        boxSize="border-box"
        h="80vh"
        width="full"
      >
        {isLoading ? (
          <Spinner speed="0.8s" color="primary.50" />
        ) : (
          <>
            <ModalCloseButton
              color={colorMode === "dark" ? "neutral.70" : undefined}
            />
            <Flex flexDir="column" h="100%">
              <ModalBody
                p={0}
                display="flex"
                flexDir="column"
                minH={0}
                flex="1"
              >
                <Flex alignItems="center" alignSelf="stretch">
                  <Text
                    color={colorMode === "dark" ? "neutral.10" : "neutral.100"}
                    fontWeight="500"
                    fontSize="25px"
                    lineHeight="32px"
                  >
                    Notifications
                  </Text>
                </Flex>
              {/*  <Flex gap="12px" m="24px 0">
                  {Object.values(NOTIFICSTION_TAB).map(
                    (tabName: NotificationTab) => (
                      <TabButton
                        isActive={isActiveTab(tabName)}
                        onClick={() => setSelectedTab(tabName)}
                        key={tabName}
                        fontSize="13px"
                        p="4px 14px"
                        h="auto"
                        w="auto"
                        fontWeight="500"
                      >
                        {tabName}
                      </TabButton>
                    )
                  )}
                    </Flex>*/}

                <Flex
                    className="scroll-hover"
                  flexDir="column"
                  overflowY="auto"
                  overflowX="hidden"
                  mr="16px"
                  sx={customScrollbar}
                >
                    {getNotifications().map((notification) => (
                      <Flex
                        flexDir="column"
                        p="12px 0"
                        borderBottom="1px solid"
                        borderColor={
                          colorMode === "dark" ? "#343839" : "neutral.30"
                        }
                        _hover={{
                          cursor: "pointer",
                       }}
                       key={notification?.id}
                      >
                        <Flex alignItems="center">
                          <NotificationIcon isRead={notification.isViewed} />
                          <Text
                            ml="8px"
                            fontSize="16px"
                            fontWeight="500"
                            lineHeight="24px"
                            color={
                              colorMode === "dark"
                                ? "neutral.10"
                                : "neutral.100"
                            }
                            onClick={handleNotificationClick(notification.id, notification.url)}
                          >
                            {notification.title}
                          </Text>
                        </Flex>
                        <Flex p="0 28px" mt="4px" flexDirection="row" alignItems="center" justifyContent="space-between">
                          <Text
                            fontSize="13px"
                            fontWeight="400"
                            lineHeight="20px"
                            color={colorMode === "dark" ? "neutral.50" : "neutral.60"}
                            textOverflow={isCollapsed ? "ellipsis" : "unset"}
                            whiteSpace={isCollapsed ? "nowrap" : "normal"}
                            overflow="hidden"
                            flex="1" // Take up as much space as possible
                          >
                            {notification.message}
                          </Text>
                          <button onClick={toggleCollapse} style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px' }}>
                            {isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
                          </button>
                        </Flex>
                        <Flex p="0 28px" mt="10px" alignItems="center">
                          <Text
                            fontSize="13px"
                            fontWeight="400"
                            lineHeight="20px"
                            color={colorMode === "dark" ? "neutral.50" : "neutral.60"}
                            mr="10px"  // Add some margin for spacing
                          >
                            {formatDistanceToNow(
                              new Date(notification.createdAt),
                              { addSuffix: true }
                            )}
                          </Text>
                          <Button size="xs" onClick={handleMarkAsViewedToggle(notification.id, notification.isViewed)}>
                            {notification.isViewed ? "Mark as Unread" : "Mark as Read"}
                          </Button>
                        </Flex>
                    </Flex>
                  ))}
                </Flex>
              </ModalBody>
            </Flex>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
