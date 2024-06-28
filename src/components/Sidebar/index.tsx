import React from "react";
import styled from "styled-components";
import CardIcon from "../../Icons/CardIcon";
import CollapsableIcon from "../../Icons/CollapsableIcon";
import DashBoardIcon from "../../Icons/DashBoardIcon";
import FeedTheBrainIcon from "../../Icons/FeedTheBrainIcon";
import HelpIcon from "../../Icons/HelpIcon";
import KnowleeChatsIcon from "../../Icons/KnowleeChatsIcon";
import ContentIcon from "../../Icons/ContentIcon";
import KnowleeSidebarLogo from "../../Icons/KnowleeSidebarLogo";
import SettingsIcon from "../../Icons/SettingsIcon";
import MenuItem from "./MenuItem";
import ThemeSwitch from "./ThemeSwitch";
import UserCard from "./UserCard";
import ExpandIcon from "src/Icons/ExpandIcon";
import { Button, CloseButton, Flex } from "@chakra-ui/react";
import TourButton from "src/components/Sidebar/TourButton";
import { useUserData } from "src/api/queries";
import CryptoTradingMarginIcon from "src/Icons/CryptoTradingMarginIcon";
import AssistantIcon from "src/Icons/AssistantIcon";

const LogoTop = styled.div<{ $collapsed?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 2.625rem 1.25rem;
  box-sizing: border-box;
  align-items: center;
  justify-content: ${({ $collapsed }) =>
    $collapsed ? "center" : "space-between"};
`;

const BodyContainer = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  align-items: center;
  padding: ${({ $collapsed }) => ($collapsed ? "24px" : "16px")};
  padding-bottom: 24px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MenuContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  color: white;
  height: calc(100vh - 365px);
  overflow: auto;
`;

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
  onClose?: () => void;
}
const Sidebar: React.FC<Props> = ({
  collapsed,
  setCollapsed,
  isMobile = false,
  onClose,
}) => {

  const { data: userData } = useUserData();

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Flex
      height="full"
      width={collapsed ? "104px" : "320px"}
      flexDirection="column"
      alignItems="center"
      boxSizing="border-box"
      transition="width 0.3s ease"
      backgroundColor="neutral.100"
    >
      <LogoTop $collapsed={collapsed}>
        {!collapsed && <KnowleeSidebarLogo />}
        {isMobile ? (
          <CloseButton color="neutral.20" onClick={onClose} />
        ) : (
          <Button display="flex" variant="unstyled" onClick={toggleSidebar} >
            {collapsed ? <ExpandIcon /> : <CollapsableIcon />}
          </Button>
        )}
      </LogoTop>
      <BodyContainer className="scroll-hover" $collapsed={collapsed}>
        <MenuContainer>
          {userData?.isSuperAdmin &&
            <MenuItem
              title="Admin Dashboard"
              icon={<DashBoardIcon />}
              link="/super-admin-dashboard"
              collapsed={collapsed}
              tooltipLabel="Admin Dashboard"
            />
          }
          <MenuItem
            title="Dashboard"
            icon={<DashBoardIcon />}
            link="/dashboard"
            collapsed={collapsed}
            tooltipLabel="A comprehensive overview of your usage, activity, and key metrics to monitor progress and insights"
          />
          <MenuItem
            title="Knowledge Sources"
            icon={<FeedTheBrainIcon />}
            link="/knowledge-sources"
            collapsed={collapsed}
            tooltipLabel="Manage and upload data sources and files to empower AI with contextual knowledge"
          />
          <MenuItem
            title="AI Assistants"
            icon={<AssistantIcon />}
            link="/knowlee-assistants/my-assistants"
            collapsed={collapsed}
            tooltipLabel="Create and customize your AI assistants, managing their skills and settings to fit your needs"
          />
          <MenuItem
            title="AI Processes"
            icon={<ContentIcon />}
            link="/knowlee-processes/my-processes"
            collapsed={collapsed}
            tooltipLabel="Map your AI processes and assign a team of AI agents with dedicated tools to accomplish your goal"
          />
          <MenuItem
            title="Chats"
            icon={<KnowleeChatsIcon />}
            link="/knowleechats"
            collapsed={collapsed}
            tooltipLabel="Select your AI assistant for direct conversations and manage all your chats in one place"
          />

          {/*<MenuItem
            title="Video Creator"
            icon={<ContentIcon />}
            link="/video-creation/video-generator"
            collapsed={collapsed}
          />
          <MenuItem
            title="Crypto Insights"
            icon={<CryptoTradingMarginIcon />}
            link="/insight-creation"
            collapsed={collapsed}
          />
          <MenuItem
            title="Content Creator"
            icon={<ContentIcon />}
            link="/content-creation"
            collapsed={collapsed}
        />
          <MenuItem
            title="Help"
            icon={<HelpIcon />}
            link="/support"
            collapsed={collapsed}
          <MenuItem
              title="Manage subscriptions"
              icon={<CardIcon />}
              link="/subscriptions"
          />
          <MenuItem
            title="Settings"
            icon={<SettingsIcon pathFill="#D84C10" />}
            link="/settings/profile"
            collapsed={collapsed}
          />*/}
        </MenuContainer>

        <Flex
          alignItems="center"
          flexDirection="column"
          gap="16px"
          marginTop="16px"
        >
          {!userData?.welcomeTourCompleted && <TourButton collapsed={collapsed} />}
          <UserCard collapsed={collapsed} />
          <ThemeSwitch collapsed={collapsed} />
        </Flex>
      </BodyContainer>
    </Flex>
  );
};

export default Sidebar;
