import { Flex } from "@chakra-ui/react";
import { TabButton } from "src/pages/SharedUi/Buttons";
import { NavLink } from "react-router-dom";

function VideoCreationTabs() {
    const tabButtonsx = {
        color: "neutral.60",
        bg: "unset",
    };

    return (
        <Flex gap="12px" overflowX="auto" paddingBottom={["8px"]} flexShrink={0}>
            <NavLink to="/video-creation/video-generator">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        Video Generator
                    </TabButton>
                )}
            </NavLink>

            <NavLink to="/video-creation/my-videos">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        My Videos
                    </TabButton>
                )}
            </NavLink>

            <NavLink to="/video-creation/created-videos">
                {({ isActive }) => (
                    <TabButton isActive={isActive} sx={tabButtonsx}>
                        Created Videos
                    </TabButton>
                )}
            </NavLink>
        </Flex>
    );
}

export default VideoCreationTabs;
