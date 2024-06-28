import { Flex } from "@chakra-ui/react";
import { TabButton } from "src/pages/SharedUi/Buttons";
import { NavLink } from "react-router-dom";

function ContentCreationTabs() {
    const tabButtonsx = {
        color: "neutral.60",
        bg: "unset",
    };

    return (
        <Flex gap="12px" overflowX="auto" paddingBottom={["8px"]}>
            <NavLink to="/content-creation/topic-generator">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        Topic Generator
                    </TabButton>
                )}
            </NavLink>

            <NavLink to="/content-creation/my-topics">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        My Topics
                    </TabButton>
                )}
            </NavLink>

            <NavLink to="/content-creation/created-content">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        Created Contents
                    </TabButton>
                )}
            </NavLink>
        </Flex>
    );
}

export default ContentCreationTabs;
