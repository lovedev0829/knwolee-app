import { Flex } from "@chakra-ui/react";
import { TabButton } from "src/pages/SharedUi/Buttons";
import { NavLink } from "react-router-dom";

function InsightCreationTabs() {
    const tabButtonsx = {
        color: "neutral.50",
        bg: "unset",
    };

    return (
        <Flex gap="12px" overflowX="auto" paddingBottom={["8px"]} flexShrink={0}>
            <NavLink to="/insight-creation/insight-generator">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        Insights Generator
                    </TabButton>
                )}
            </NavLink>

            {/* <NavLink to="/insight-creation/my-metrics">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        My Metrics
                    </TabButton>
                )}
            </NavLink> */}

            <NavLink to="/insight-creation/created-insight">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        Created insights
                    </TabButton>
                )}
            </NavLink>
        </Flex>
    );
}

export default InsightCreationTabs;
