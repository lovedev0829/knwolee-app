import { Box, useColorModeValue, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  link: string;
  collapsed?: boolean;
  tooltipLabel: string;

}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  icon,
  link,
  collapsed = false,
  tooltipLabel
}) => {
  const location = useLocation();
  const isSelected = location.pathname === link;

  const bgHoverColor = useColorModeValue("neutral.70", "neutral.70");



  return (
    <Tooltip label={tooltipLabel} fontSize="sm" placement="right" hasArrow>
      <Box
        as={RouterLink}
        to={link}
        display="flex"
        width="100%"
        cursor="pointer"
        py={3}
        px={5}
        borderRadius="md"
        alignItems="center"
        gap={5}
        _hover={{ bg: bgHoverColor, color: 'white' }}
        bg={isSelected ? 'linear-gradient(270deg, #323337 0%, rgba(97, 92, 66, 0.50) 100%)' : 'none'}
        color={isSelected ? 'white' : '#CACDCE'}
        fontWeight={isSelected ? '600' : '400'}
        textDecoration="none"
        sx={{ cursor: 'pointer !important' }}
        justifyContent={collapsed ? "center" : "unset"}
      >
        <Box>{icon}</Box>
        {!collapsed && <Box>{title}</Box>}
      </Box>
    </Tooltip>
  );
};

export default MenuItem;