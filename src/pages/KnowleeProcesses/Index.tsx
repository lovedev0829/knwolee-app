import { Flex, Text, Tooltip, useToast } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import PageContainer from "src/components/PageContainer";
import { TabButton } from "../SharedUi/Buttons";
import { NavLink, Outlet } from "react-router-dom";
import { useUserAgents } from "src/api/queries/knowleeAgentQuery";

const tabButtonSx = {
    color: "neutral.60",
    bg: "unset",
};

const KnowleeProcesses = () => {
    const toast = useToast();

    const { data: userAssistantList, isLoading: isLoadingAssistantList } =
        useUserAgents();

    return (
        <PageContainer
            title={
                <Flex alignItems="center">
                    <Text mr={2}>AI Processes</Text>
                    <Tooltip label="Design and deploy fully autonomous AI agents capable of performing tasks, making decisions, and interacting as programmed, without human intervention." fontSize="sm">
                        <span>
                            <InfoIcon boxSize="16px" />
                        </span>
                    </Tooltip>
                </Flex>
            }
        >
            <Flex gap="12px" flexShrink={0} paddingBottom={["8px"]} overflow={"auto"}>
                <NavLink to="/knowlee-processes/my-processes">
                    {({ isActive }) => (
                        <TabButton isActive={isActive}>
                            My Processes
                        </TabButton>
                    )}
                </NavLink>
                <NavLink to="/knowlee-processes/processes-store">
                    {({ isActive }) => (
                        <TabButton isActive={isActive}>
                            Processes Store
                        </TabButton>
                    )}
                </NavLink>
                <NavLink
                    to="/knowlee-processes/create-process"
                    onClick={(e) => {
                        if (!userAssistantList || !userAssistantList.length) {
                            toast({
                                title: "Oops! It seems like you haven't created an assistant yet.",
                                description: "Let's add one to get started with creating your first process!",
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
                        <TabButton isActive={isActive} isDisabled={isLoadingAssistantList}>
                            Create Process
                        </TabButton>
                    )}
                </NavLink>
            </Flex>
            <Outlet />
        </PageContainer>
    );
};

export default KnowleeProcesses;
