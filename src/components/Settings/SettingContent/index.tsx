import React from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import SettingMenu from '../SettingMenu';
import SettingMenuMobile from '../SettingMenu/SettingMenuMobile';

const SettingContent: React.FC = () => {
  return (
    <>
      {/* mobile view */}
      <Box
        display={["block", "block", "none"]}
        overflow={"auto"}
      >
        <SettingMenuMobile />

        <Box width="full" overflow="auto" className="scroll-hover">
          <Outlet />
        </Box>
      </Box>


      {/* desktop view */}
      <Flex
        className="scroll-hover"
        alignItems="stretch"
        gap={["24px", "24px", "24px", "36px"]}
        display={["none", "none", "flex"]}
      overflow={'auto'}
      pr={3}>
      {/* Menu Section */}
        <Box
          width={["130px", "130px", "130px", "250px"]}
          p={0}
        >
          <SettingMenu />
        </Box>

      {/* Form Section */}
        <Box width="full" overflow={"auto"}>
          <Outlet />
        </Box>
      </Flex>
    </>

  );
};

export default SettingContent;