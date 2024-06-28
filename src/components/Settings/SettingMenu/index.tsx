import React from 'react';
import { Flex, VStack, useColorMode } from '@chakra-ui/react';
import { MenuItem } from './MenuItem';
import { menus } from './mockups';
import { LogoutMenuItem } from './LogoutMenuItem';
import { useAuth0 } from '@auth0/auth0-react';
import { DeleteAccountMenuItem } from './DeleteAccountMenuItem';

interface SettingMenuProps { }

const SettingMenu: React.FC<SettingMenuProps> = () => {
  const { colorMode } = useColorMode()

  const { user } = useAuth0();
  
  const isUniversalUser = () =>  user?.sub?.startsWith('auth0|')
  
  const getFilteredMenus = ()=> {
    if (isUniversalUser()) return menus
    return menus.filter(menu => menu.title !== 'Password')
  }

  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      // justifyContent="space-between"
      height="100%"
    >
      <VStack
        spacing={0}
        height="calc(100vh - 200px)"
      >
      <VStack spacing={1} align="stretch" pb={3}>
        {getFilteredMenus().map((menu) => <MenuItem key={menu.route} {...menu} />)}
      </VStack>
      <VStack
        pt="3"
        borderTopWidth="1px"
        borderStyle="solid"
        borderColor={colorMode === "dark" ? "#343839" : "#E8ECEF"}
      >
        <LogoutMenuItem />
      </VStack>
    </VStack>
      <DeleteAccountMenuItem />
    </Flex>
  );
}

export default SettingMenu;