import { Flex } from "@chakra-ui/react";
import { TabButton } from "src/pages/SharedUi/Buttons";
import { NavLink } from "react-router-dom";

function AiTipseterCreationTabs() {
    const tabButtonsx = {
        color: "neutral.60",
        bg: "unset",
    };

    return (
        <Flex gap="12px" overflowX="auto" paddingBottom={["8px"]} flexShrink={0}>
            <NavLink to="/ai-tipster/football-fixtures">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        All Fixtures
                    </TabButton>
                )}
            </NavLink>
            <NavLink to="/ai-tipster/football-tbd">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        TBD
                    </TabButton>
                )}
            </NavLink>
        </Flex>
    );
}

export default AiTipseterCreationTabs;
