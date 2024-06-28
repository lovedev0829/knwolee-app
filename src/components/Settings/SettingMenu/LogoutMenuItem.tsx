import React from 'react';
import { Button, Text } from '@chakra-ui/react';
import { LogoutIcon } from '../Icons';
import { useAuth0 } from '@auth0/auth0-react';

export const LogoutMenuItem: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
     void logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <Button
      onClick={handleLogout}
      leftIcon={<LogoutIcon />}
      colorScheme="blue"
      width={["full", "full", "140px", "212px"]}
      height="40px"
      justifyContent="flex-start"
      fontSize="13px"
      color="#6C7275"
      lineHeight="20px"
      fontWeight="500"
      alignItems="center"
      borderRadius="48px"
      bg="transparent"
      _hover={{
        bg: "neutral.30",
      }}
      _active={{
        bg: "transparent",
      }}
    >
      <Text
        color="#D84C10"
        fontFamily="Roboto"
        fontSize="13px"
        fontStyle="normal"
        fontWeight="500"
        lineHeight="20px"
      >Logout</Text>
    </Button>
  );
}