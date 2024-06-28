import { Flex, Text, Tooltip, useToast } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import PageContainer from "src/components/PageContainer";
import { TabButton } from "../SharedUi/Buttons";
import { NavLink, Outlet } from "react-router-dom";
import { useUserKnowledgeData } from "src/api/queries";

const tabButtonSx = {
    color: "neutral.60",
    bg: "unset",
};

const KnowleeAgents = () => {
    const toast = useToast();

    const { data: userDataSources } = useUserKnowledgeData();

    return (
        <PageContainer
            title={
                <Flex alignItems="center">
                    <Text mr={2}>AI Assistants</Text>
                    <Tooltip label="Design and deploy fully autonomous AI agents capable of performing tasks, making decisions, and interacting as programmed, without human intervention." fontSize="sm">
                        <span>
                            <InfoIcon boxSize="16px" />
                        </span>
                    </Tooltip>
                </Flex>
            }
        >
            <Flex gap="12px" flexShrink={0} paddingBottom={["8px"]} overflow={"auto"}>
                <NavLink to="/knowlee-assistants/my-assistants">
                    {({ isActive }) => (
                        <TabButton isActive={isActive}>
                            My Assistants
                        </TabButton>
                    )}
                </NavLink>
                <NavLink to="/knowlee-assistants/assistants-store">
                    {({ isActive }) => (
                        <TabButton isActive={isActive}>
                            Assistants Store
                        </TabButton>
                    )}
                </NavLink>
                <NavLink
                    to="/knowlee-assistants/create-assistant"
                    onClick={(e) => {
                        if (!userDataSources || !userDataSources.length) {
                            toast({
                                title: "Oops! It seems like you haven't added a knowledge source yet.",
                                description: "Let's add one to get started with creating your first agent!",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            });
                            // disable navigation
                            e.preventDefault();
                        }
                    }}
                >
                    {({ isActive }) => (
                        <TabButton isActive={isActive}>
                            Create Assistant
                        </TabButton>
                    )}
                </NavLink>
            </Flex>
            <Outlet />
        </PageContainer>
    );
};

export default KnowleeAgents;
